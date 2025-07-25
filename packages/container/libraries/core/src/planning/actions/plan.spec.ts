import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  Mocked,
  vitest,
} from 'vitest';

vitest.mock('../calculations/buildFilteredServiceBindings');
vitest.mock('../calculations/buildGetPlanOptionsFromPlanParams');
vitest.mock('../calculations/checkServiceNodeSingleInjectionBindings');

import { ServiceIdentifier } from '@inversifyjs/common';

import {
  BindingConstraintsImplementation,
  InternalBindingConstraints,
} from '../../binding/models/BindingConstraintsImplementation';
import { bindingScopeValues } from '../../binding/models/BindingScope';
import { bindingTypeValues } from '../../binding/models/BindingType';
import { ConstantValueBinding } from '../../binding/models/ConstantValueBinding';
import { InstanceBinding } from '../../binding/models/InstanceBinding';
import { ResolvedValueBinding } from '../../binding/models/ResolvedValueBinding';
import { ServiceRedirectionBinding } from '../../binding/models/ServiceRedirectionBinding';
import { SingleInmutableLinkedListNode } from '../../common/models/SingleInmutableLinkedList';
import { Writable } from '../../common/models/Writable';
import { ClassMetadataFixtures } from '../../metadata/fixtures/ClassMetadataFixtures';
import { ClassElementMetadataKind } from '../../metadata/models/ClassElementMetadataKind';
import { ClassMetadata } from '../../metadata/models/ClassMetadata';
import { ManagedClassElementMetadata } from '../../metadata/models/ManagedClassElementMetadata';
import { ResolvedValueElementMetadata } from '../../metadata/models/ResolvedValueElementMetadata';
import { ResolvedValueElementMetadataKind } from '../../metadata/models/ResolvedValueElementMetadataKind';
import { ResolvedValueMetadata } from '../../metadata/models/ResolvedValueMetadata';
import { UnmanagedClassElementMetadata } from '../../metadata/models/UnmanagedClassElementMetadata';
import {
  buildFilteredServiceBindings,
  BuildFilteredServiceBindingsOptions,
} from '../calculations/buildFilteredServiceBindings';
import { buildGetPlanOptionsFromPlanParams } from '../calculations/buildGetPlanOptionsFromPlanParams';
import { checkServiceNodeSingleInjectionBindings } from '../calculations/checkServiceNodeSingleInjectionBindings';
import { GetPlanOptions } from '../models/GetPlanOptions';
import { InstanceBindingNode } from '../models/InstanceBindingNode';
import { PlanBindingNode } from '../models/PlanBindingNode';
import { PlanParams } from '../models/PlanParams';
import { PlanResult } from '../models/PlanResult';
import { PlanServiceNode } from '../models/PlanServiceNode';
import { PlanServiceNodeParent } from '../models/PlanServiceNodeParent';
import { PlanServiceRedirectionBindingNode } from '../models/PlanServiceRedirectionBindingNode';
import { ResolvedValueBindingNode } from '../models/ResolvedValueBindingNode';
import { SubplanParams } from '../models/SubplanParams';
import { plan } from './plan';

describe(plan, () => {
  describe('having PlanParams with name and tag root constraint', () => {
    let planParamsMock: Mocked<PlanParams>;

    beforeAll(() => {
      planParamsMock = {
        autobindOptions: undefined,
        operations: {
          getBindings: vitest.fn() as unknown,
          getBindingsChained: vitest.fn() as unknown,
          getClassMetadata: vitest.fn() as unknown,
          getPlan: vitest.fn(),
          setBinding: vitest.fn() as unknown,
          setNonCachedServiceNode: vitest.fn(),
          setPlan: vitest.fn(),
        },
        rootConstraints: {
          chained: false,
          isMultiple: true,
          name: 'name',
          serviceIdentifier: 'service-id',
          tag: {
            key: 'tag-key',
            value: 'tag-value',
          },
        },
        servicesBranch: [],
      } as Partial<Mocked<PlanParams>> as Mocked<PlanParams>;
    });

    describe('when called, and params.getBindings() returns an array with a ConstantValueBinding', () => {
      let getPlanOptionsFixture: GetPlanOptions;
      let constantValueBinding: ConstantValueBinding<unknown>;
      let result: unknown;

      beforeAll(() => {
        getPlanOptionsFixture = {
          isMultiple: false,
          name: undefined,
          optional: false,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          tag: undefined,
        };
        constantValueBinding = {
          cache: {
            isRight: true,
            value: Symbol(),
          },
          id: 1,
          isSatisfiedBy: vitest.fn(() => true),
          moduleId: undefined,
          onActivation: undefined,
          onDeactivation: undefined,
          scope: bindingScopeValues.Singleton,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          type: bindingTypeValues.ConstantValue,
          value: Symbol(),
        };

        vitest
          .mocked(buildGetPlanOptionsFromPlanParams)
          .mockReturnValueOnce(getPlanOptionsFixture);

        vitest
          .mocked(buildFilteredServiceBindings)
          .mockReturnValueOnce([constantValueBinding]);

        result = plan(planParamsMock);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call buildGetPlanOptionsFromPlanParams()', () => {
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledTimes(1);
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledWith(
          planParamsMock,
        );
      });

      it('should call planParams.operations.getPlan()', () => {
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledTimes(1);
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledWith(
          getPlanOptionsFixture,
        );
      });

      it('should call buildFilteredServiceBindings()', () => {
        expect(buildFilteredServiceBindings).toHaveBeenCalledTimes(1);
        expect(buildFilteredServiceBindings).toHaveBeenCalledWith(
          planParamsMock,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
      });

      it('should return expected PlanResult', () => {
        const planServiceNodeBindings: PlanBindingNode[] = [];

        const planServiceNode: PlanServiceNode = {
          bindings: planServiceNodeBindings,
          isContextFree: true,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
        };

        const expected: PlanResult = {
          tree: {
            root: expect.objectContaining(planServiceNode),
          },
        };

        planServiceNodeBindings.push({
          binding: constantValueBinding,
        });

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe('having PlanParams with isMultiple true root constraint', () => {
    let planParamsMock: Mocked<PlanParams>;

    beforeAll(() => {
      planParamsMock = {
        autobindOptions: undefined,
        operations: {
          getBindings: vitest.fn(),
          getBindingsChained: vitest.fn(),
          getClassMetadata: vitest.fn(),
          getPlan: vitest.fn(),
          setBinding: vitest.fn(),
          setNonCachedServiceNode: vitest.fn(),
          setPlan: vitest.fn(),
        },
        rootConstraints: {
          chained: false,
          isMultiple: true,
          serviceIdentifier: 'service-id',
        },
        servicesBranch: [],
      } as Partial<Mocked<PlanParams>> as Mocked<PlanParams>;
    });

    describe('when called, and params.getPlan() returns PlanResult', () => {
      let getPlanOptionsFixture: GetPlanOptions;
      let planResultFixture: PlanResult;

      let result: unknown;

      beforeAll(() => {
        getPlanOptionsFixture = {
          isMultiple: false,
          name: undefined,
          optional: false,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          tag: undefined,
        };
        planResultFixture = {
          tree: {
            root: {
              bindings: [],
              isContextFree: true,
              serviceIdentifier:
                planParamsMock.rootConstraints.serviceIdentifier,
            },
          },
        };

        vitest
          .mocked(buildGetPlanOptionsFromPlanParams)
          .mockReturnValueOnce(getPlanOptionsFixture);

        vitest
          .mocked(planParamsMock.operations.getPlan)
          .mockReturnValueOnce(planResultFixture);

        result = plan(planParamsMock);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call buildGetPlanOptionsFromPlanParams()', () => {
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledTimes(1);
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledWith(
          planParamsMock,
        );
      });

      it('should call planParams.operations.getPlan()', () => {
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledTimes(1);
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledWith(
          getPlanOptionsFixture,
        );
      });

      it('should return expected PlanResult', () => {
        const planServiceNode: PlanServiceNode = {
          bindings: [],
          isContextFree: true,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
        };

        const expected: PlanResult = {
          tree: {
            root: planServiceNode,
          },
        };

        expect(result).toStrictEqual(expected);
      });
    });

    describe('when called, and params.getBindings() returns undefined', () => {
      let getPlanOptionsFixture: GetPlanOptions;

      let result: unknown;

      beforeAll(() => {
        getPlanOptionsFixture = {
          isMultiple: false,
          name: undefined,
          optional: false,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          tag: undefined,
        };

        vitest
          .mocked(buildGetPlanOptionsFromPlanParams)
          .mockReturnValueOnce(getPlanOptionsFixture);

        vitest.mocked(buildFilteredServiceBindings).mockReturnValueOnce([]);

        result = plan(planParamsMock);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call buildGetPlanOptionsFromPlanParams()', () => {
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledTimes(1);
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledWith(
          planParamsMock,
        );
      });

      it('should call planParams.operations.getPlan()', () => {
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledTimes(1);
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledWith(
          getPlanOptionsFixture,
        );
      });

      it('should call buildFilteredServiceBindings()', () => {
        expect(buildFilteredServiceBindings).toHaveBeenCalledTimes(1);
        expect(buildFilteredServiceBindings).toHaveBeenCalledWith(
          planParamsMock,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
      });

      it('should return expected PlanResult', () => {
        const planServiceNode: PlanServiceNode = {
          bindings: [],
          isContextFree: true,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
        };

        const expected: PlanResult = {
          tree: {
            root: expect.objectContaining(planServiceNode),
          },
        };

        expect(result).toStrictEqual(expected);
      });
    });

    describe('when called, and params.getBindings() returns an array with a single ConstantValueBinding', () => {
      let getPlanOptionsFixture: GetPlanOptions;
      let constantValueBinding: ConstantValueBinding<unknown>;
      let result: unknown;

      beforeAll(() => {
        getPlanOptionsFixture = {
          isMultiple: false,
          name: undefined,
          optional: false,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          tag: undefined,
        };

        constantValueBinding = {
          cache: {
            isRight: true,
            value: Symbol(),
          },
          id: 1,
          isSatisfiedBy: vitest.fn(() => true),
          moduleId: undefined,
          onActivation: undefined,
          onDeactivation: undefined,
          scope: bindingScopeValues.Singleton,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          type: bindingTypeValues.ConstantValue,
          value: Symbol(),
        };

        vitest
          .mocked(buildGetPlanOptionsFromPlanParams)
          .mockReturnValueOnce(getPlanOptionsFixture);

        vitest
          .mocked(buildFilteredServiceBindings)
          .mockReturnValueOnce([constantValueBinding]);

        result = plan(planParamsMock);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call buildGetPlanOptionsFromPlanParams()', () => {
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledTimes(1);
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledWith(
          planParamsMock,
        );
      });

      it('should call planParams.operations.getPlan()', () => {
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledTimes(1);
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledWith(
          getPlanOptionsFixture,
        );
      });

      it('should call buildFilteredServiceBindings()', () => {
        expect(buildFilteredServiceBindings).toHaveBeenCalledTimes(1);
        expect(buildFilteredServiceBindings).toHaveBeenCalledWith(
          planParamsMock,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
      });

      it('should return expected PlanResult', () => {
        const planServiceNode: PlanServiceNode = {
          bindings: [
            {
              binding: constantValueBinding,
            },
          ],
          isContextFree: true,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
        };

        const expected: PlanResult = {
          tree: {
            root: expect.objectContaining(planServiceNode),
          },
        };

        expect(result).toStrictEqual(expected);
      });
    });

    describe('when called, and params.getBindings() returns an array with a single InstanceBinding with empty class metadata', () => {
      let getPlanOptionsFixture: GetPlanOptions;
      let classMetadataFixture: ClassMetadata;
      let instanceBindingFixture: InstanceBinding<unknown>;
      let result: unknown;

      beforeAll(() => {
        getPlanOptionsFixture = {
          isMultiple: false,
          name: undefined,
          optional: false,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          tag: undefined,
        };
        classMetadataFixture = ClassMetadataFixtures.any;
        instanceBindingFixture = {
          cache: {
            isRight: true,
            value: Symbol(),
          },
          id: 1,
          implementationType: class {},
          isSatisfiedBy: vitest.fn(() => true),
          moduleId: undefined,
          onActivation: undefined,
          onDeactivation: undefined,
          scope: bindingScopeValues.Singleton,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          type: bindingTypeValues.Instance,
        };

        vitest
          .mocked(buildGetPlanOptionsFromPlanParams)
          .mockReturnValueOnce(getPlanOptionsFixture);

        vitest
          .mocked(buildFilteredServiceBindings)
          .mockReturnValueOnce([instanceBindingFixture]);

        vitest
          .mocked(planParamsMock.operations.getClassMetadata)
          .mockReturnValueOnce(classMetadataFixture);

        result = plan(planParamsMock);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call buildGetPlanOptionsFromPlanParams()', () => {
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledTimes(1);
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledWith(
          planParamsMock,
        );
      });

      it('should call planParams.operations.getPlan()', () => {
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledTimes(1);
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledWith(
          getPlanOptionsFixture,
        );
      });

      it('should call buildFilteredServiceBindings()', () => {
        expect(buildFilteredServiceBindings).toHaveBeenCalledTimes(1);
        expect(buildFilteredServiceBindings).toHaveBeenCalledWith(
          planParamsMock,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
      });

      it('should return expected PlanResult', () => {
        const planServiceNodeBindings: PlanBindingNode[] = [];

        const planServiceNode: PlanServiceNode = {
          bindings: planServiceNodeBindings,
          isContextFree: true,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
        };

        const expected: PlanResult = {
          tree: {
            root: expect.objectContaining(planServiceNode),
          },
        };

        const instanceBindingNode: InstanceBindingNode = {
          binding: instanceBindingFixture,
          classMetadata: classMetadataFixture,
          constructorParams: [],
          propertyParams: new Map(),
        };

        planServiceNodeBindings.push(instanceBindingNode);

        expect(result).toStrictEqual(expected);
      });
    });

    describe('when called, and params.getBindings() returns an array with a single InstanceBinding with non empty class metadata with multiple injection', () => {
      let getPlanOptionsFixture: GetPlanOptions;
      let constantValueBinding: ConstantValueBinding<unknown>;
      let constructorArgumentMetadata: ManagedClassElementMetadata;
      let propertyMetadata: ManagedClassElementMetadata;
      let propertyKey: string;
      let classMetadataFixture: ClassMetadata;
      let instanceBindingFixture: InstanceBinding<unknown>;
      let result: unknown;

      beforeAll(() => {
        getPlanOptionsFixture = {
          isMultiple: false,
          name: undefined,
          optional: false,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          tag: undefined,
        };
        constantValueBinding = {
          cache: {
            isRight: true,
            value: Symbol(),
          },
          id: 1,
          isSatisfiedBy: vitest.fn(() => true),
          moduleId: undefined,
          onActivation: undefined,
          onDeactivation: undefined,
          scope: bindingScopeValues.Singleton,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          type: bindingTypeValues.ConstantValue,
          value: Symbol(),
        };
        constructorArgumentMetadata = {
          chained: false,
          kind: ClassElementMetadataKind.multipleInjection,
          name: undefined,
          optional: false,
          tags: new Map(),
          value: 'constructor-param-service-id',
        };
        propertyKey = 'property-key';
        propertyMetadata = {
          chained: false,
          kind: ClassElementMetadataKind.multipleInjection,
          name: undefined,
          optional: false,
          tags: new Map(),
          value: 'property-param-service-id',
        };
        classMetadataFixture = {
          constructorArguments: [constructorArgumentMetadata],
          lifecycle: {
            postConstructMethodName: undefined,
            preDestroyMethodName: undefined,
          },
          properties: new Map([[propertyKey, propertyMetadata]]),
          scope: undefined,
        };
        instanceBindingFixture = {
          cache: {
            isRight: true,
            value: Symbol(),
          },
          id: 1,
          implementationType: class {},
          isSatisfiedBy: vitest.fn(() => true),
          moduleId: undefined,
          onActivation: undefined,
          onDeactivation: undefined,
          scope: bindingScopeValues.Singleton,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          type: bindingTypeValues.Instance,
        };

        vitest
          .mocked(buildGetPlanOptionsFromPlanParams)
          .mockReturnValueOnce(getPlanOptionsFixture);

        vitest
          .mocked(buildFilteredServiceBindings)
          .mockReturnValueOnce([instanceBindingFixture])
          .mockReturnValueOnce([constantValueBinding])
          .mockReturnValueOnce([constantValueBinding]);

        vitest
          .mocked(planParamsMock.operations.getClassMetadata)
          .mockReturnValueOnce(classMetadataFixture);

        result = plan(planParamsMock);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call buildGetPlanOptionsFromPlanParams()', () => {
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledTimes(1);
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledWith(
          planParamsMock,
        );
      });

      it('should call planParams.getPlan()', () => {
        const expectedSecondGetPlanOptions: GetPlanOptions = {
          chained: false,
          isMultiple: true,
          name: undefined,
          optional: false,
          serviceIdentifier:
            constructorArgumentMetadata.value as ServiceIdentifier,
          tag: undefined,
        };

        const expectedThirdGetPlanOptions: GetPlanOptions = {
          chained: false,
          isMultiple: true,
          name: undefined,
          optional: false,
          serviceIdentifier: propertyMetadata.value as ServiceIdentifier,
          tag: undefined,
        };

        expect(planParamsMock.operations.getPlan).toHaveBeenCalledTimes(3);
        expect(planParamsMock.operations.getPlan).toHaveBeenNthCalledWith(
          1,
          getPlanOptionsFixture,
        );
        expect(planParamsMock.operations.getPlan).toHaveBeenNthCalledWith(
          2,
          expectedSecondGetPlanOptions,
        );
        expect(planParamsMock.operations.getPlan).toHaveBeenNthCalledWith(
          3,
          expectedThirdGetPlanOptions,
        );
      });

      it('should call buildFilteredServiceBindings()', () => {
        const expectedSublan: Mocked<SubplanParams> = {
          autobindOptions: planParamsMock.autobindOptions,
          node: expect.any(Object) as unknown as Mocked<PlanServiceNodeParent>,
          operations: planParamsMock.operations,
          servicesBranch: expect.any(Array) as unknown as ServiceIdentifier[],
        };

        expect(buildFilteredServiceBindings).toHaveBeenCalledTimes(3);
        expect(buildFilteredServiceBindings).toHaveBeenNthCalledWith(
          1,
          planParamsMock,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
        expect(buildFilteredServiceBindings).toHaveBeenNthCalledWith(
          2,
          expectedSublan,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
        expect(buildFilteredServiceBindings).toHaveBeenNthCalledWith(
          3,
          expectedSublan,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
      });

      it('should return expected PlanResult', () => {
        const planServiceNodeBindings: PlanBindingNode[] = [];

        const planServiceNode: PlanServiceNode = {
          bindings: planServiceNodeBindings,
          isContextFree: true,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
        };

        const expected: PlanResult = {
          tree: {
            root: expect.objectContaining(planServiceNode),
          },
        };

        const instanceBindingNode: InstanceBindingNode = {
          binding: instanceBindingFixture,
          classMetadata: classMetadataFixture,
          constructorParams: [],
          propertyParams: new Map(),
        };

        const constructorParamsPlanServiceNodeBindings: PlanBindingNode[] = [];

        const constructorParamsPlanServiceNode: PlanServiceNode = {
          bindings: constructorParamsPlanServiceNodeBindings,
          isContextFree: true,
          serviceIdentifier:
            constructorArgumentMetadata.value as ServiceIdentifier,
        };

        constructorParamsPlanServiceNodeBindings.push({
          binding: constantValueBinding,
        });

        const propertyParamsPlanServiceNodeBindings: PlanBindingNode[] = [];

        const propertyParamsPlanServiceNode: PlanServiceNode = {
          bindings: propertyParamsPlanServiceNodeBindings,
          isContextFree: true,
          serviceIdentifier: propertyMetadata.value as ServiceIdentifier,
        };

        propertyParamsPlanServiceNodeBindings.push({
          binding: constantValueBinding,
        });

        instanceBindingNode.constructorParams.push(
          expect.objectContaining(
            constructorParamsPlanServiceNode,
          ) as PlanServiceNode,
        );

        instanceBindingNode.propertyParams.set(
          propertyKey,
          expect.objectContaining(
            propertyParamsPlanServiceNode,
          ) as PlanServiceNode,
        );

        planServiceNodeBindings.push(instanceBindingNode);

        expect(result).toStrictEqual(expected);
      });
    });

    describe('when called, and params.getBindings() returns an array with a single InstanceBinding with non empty class metadata with single injection', () => {
      let getPlanOptionsFixture: GetPlanOptions;
      let constantValueBinding: ConstantValueBinding<unknown>;
      let constructorArgumentMetadata: ManagedClassElementMetadata;
      let propertyMetadata: ManagedClassElementMetadata;
      let propertyKey: string;
      let classMetadataFixture: ClassMetadata;
      let instanceBindingFixture: InstanceBinding<unknown>;
      let result: unknown;

      beforeAll(() => {
        getPlanOptionsFixture = {
          isMultiple: false,
          name: undefined,
          optional: false,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          tag: undefined,
        };
        constantValueBinding = {
          cache: {
            isRight: true,
            value: Symbol(),
          },
          id: 1,
          isSatisfiedBy: vitest.fn(() => true),
          moduleId: undefined,
          onActivation: undefined,
          onDeactivation: undefined,
          scope: bindingScopeValues.Singleton,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          type: bindingTypeValues.ConstantValue,
          value: Symbol(),
        };
        constructorArgumentMetadata = {
          kind: ClassElementMetadataKind.singleInjection,
          name: undefined,
          optional: false,
          tags: new Map(),
          value: 'constructor-param-service-id',
        };
        propertyKey = 'property-key';
        propertyMetadata = {
          kind: ClassElementMetadataKind.singleInjection,
          name: undefined,
          optional: false,
          tags: new Map(),
          value: 'property-param-service-id',
        };
        classMetadataFixture = {
          constructorArguments: [constructorArgumentMetadata],
          lifecycle: {
            postConstructMethodName: undefined,
            preDestroyMethodName: undefined,
          },
          properties: new Map([[propertyKey, propertyMetadata]]),
          scope: undefined,
        };
        instanceBindingFixture = {
          cache: {
            isRight: true,
            value: Symbol(),
          },
          id: 1,
          implementationType: class {},
          isSatisfiedBy: vitest.fn(() => true),
          moduleId: undefined,
          onActivation: undefined,
          onDeactivation: undefined,
          scope: bindingScopeValues.Singleton,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          type: bindingTypeValues.Instance,
        };

        vitest
          .mocked(buildGetPlanOptionsFromPlanParams)
          .mockReturnValueOnce(getPlanOptionsFixture);

        vitest
          .mocked(buildFilteredServiceBindings)
          .mockReturnValueOnce([instanceBindingFixture])
          .mockReturnValueOnce([constantValueBinding])
          .mockReturnValueOnce([constantValueBinding]);

        vitest
          .mocked(planParamsMock.operations.getClassMetadata)
          .mockReturnValueOnce(classMetadataFixture);

        result = plan(planParamsMock);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call buildGetPlanOptionsFromPlanParams()', () => {
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledTimes(1);
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledWith(
          planParamsMock,
        );
      });

      it('should call planParams.getPlan()', () => {
        const expectedSecondGetPlanOptions: GetPlanOptions = {
          isMultiple: false,
          name: undefined,
          optional: false,
          serviceIdentifier:
            constructorArgumentMetadata.value as ServiceIdentifier,
          tag: undefined,
        };

        const expectedThirdGetPlanOptions: GetPlanOptions = {
          isMultiple: false,
          name: undefined,
          optional: false,
          serviceIdentifier: propertyMetadata.value as ServiceIdentifier,
          tag: undefined,
        };

        expect(planParamsMock.operations.getPlan).toHaveBeenCalledTimes(3);
        expect(planParamsMock.operations.getPlan).toHaveBeenNthCalledWith(
          1,
          getPlanOptionsFixture,
        );
        expect(planParamsMock.operations.getPlan).toHaveBeenNthCalledWith(
          2,
          expectedSecondGetPlanOptions,
        );
        expect(planParamsMock.operations.getPlan).toHaveBeenNthCalledWith(
          3,
          expectedThirdGetPlanOptions,
        );
      });

      it('should call buildFilteredServiceBindings()', () => {
        const expectedSublan: Mocked<SubplanParams> = {
          autobindOptions: planParamsMock.autobindOptions,
          node: expect.any(Object) as unknown as Mocked<PlanServiceNodeParent>,
          operations: planParamsMock.operations,
          servicesBranch: expect.any(Array) as unknown as ServiceIdentifier[],
        };

        expect(buildFilteredServiceBindings).toHaveBeenCalledTimes(3);
        expect(buildFilteredServiceBindings).toHaveBeenNthCalledWith(
          1,
          planParamsMock,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
        expect(buildFilteredServiceBindings).toHaveBeenNthCalledWith(
          2,
          expectedSublan,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
        expect(buildFilteredServiceBindings).toHaveBeenNthCalledWith(
          3,
          expectedSublan,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
      });

      it('should call checkServiceNodeSingleInjectionBindings()', () => {
        const constructorParamsPlanServiceNode: PlanServiceNode = {
          bindings: expect.any(Object) as unknown as PlanBindingNode,
          isContextFree: true,
          serviceIdentifier:
            constructorArgumentMetadata.value as ServiceIdentifier,
        };

        const expectedConstructorParamsInternalBindingConstraintsNode: SingleInmutableLinkedListNode<InternalBindingConstraints> =
          {
            elem: {
              getAncestorsCalled: false,
              name: undefined,
              serviceIdentifier:
                constructorArgumentMetadata.value as ServiceIdentifier,
              tags: new Map(),
            },
            previous: {
              elem: {
                getAncestorsCalled: false,
                name: undefined,
                serviceIdentifier:
                  planParamsMock.rootConstraints.serviceIdentifier,
                tags: new Map(),
              },
              previous: undefined,
            },
          };

        const propertyParamsPlanServiceNode: PlanServiceNode = {
          bindings: expect.any(Object) as unknown as PlanBindingNode,
          isContextFree: true,
          serviceIdentifier: propertyMetadata.value as ServiceIdentifier,
        };

        const expectedPropertyParamsInternalBindingConstraintsNode: SingleInmutableLinkedListNode<InternalBindingConstraints> =
          {
            elem: {
              getAncestorsCalled: false,
              name: undefined,
              serviceIdentifier: propertyMetadata.value as ServiceIdentifier,
              tags: new Map(),
            },
            previous: {
              elem: {
                getAncestorsCalled: false,
                name: undefined,
                serviceIdentifier:
                  planParamsMock.rootConstraints.serviceIdentifier,
                tags: new Map(),
              },
              previous: undefined,
            },
          };

        expect(checkServiceNodeSingleInjectionBindings).toHaveBeenCalledTimes(
          2,
        );
        expect(checkServiceNodeSingleInjectionBindings).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining(constructorParamsPlanServiceNode),
          constructorArgumentMetadata.optional,
          expectedConstructorParamsInternalBindingConstraintsNode,
        );
        expect(checkServiceNodeSingleInjectionBindings).toHaveBeenNthCalledWith(
          2,
          expect.objectContaining(propertyParamsPlanServiceNode),
          propertyMetadata.optional,
          expectedPropertyParamsInternalBindingConstraintsNode,
        );
      });

      it('should return expected PlanResult', () => {
        const constructorParamsPlanServiceNode: PlanServiceNode = {
          bindings: {
            binding: constantValueBinding,
          },
          isContextFree: true,
          serviceIdentifier:
            constructorArgumentMetadata.value as ServiceIdentifier,
        };

        const propertyParamsPlanServiceNode: PlanServiceNode = {
          bindings: {
            binding: constantValueBinding,
          },
          isContextFree: true,
          serviceIdentifier: propertyMetadata.value as ServiceIdentifier,
        };

        const instanceBindingNode: InstanceBindingNode = {
          binding: instanceBindingFixture,
          classMetadata: classMetadataFixture,
          constructorParams: [constructorParamsPlanServiceNode],
          propertyParams: new Map([
            [propertyKey, propertyParamsPlanServiceNode],
          ]),
        };

        const planServiceNode: PlanServiceNode = {
          bindings: [instanceBindingNode],
          isContextFree: true,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
        };

        const expected: PlanResult = {
          tree: {
            root: expect.objectContaining(planServiceNode),
          },
        };

        expect(result).toStrictEqual(expected);
      });
    });

    describe('when called, and params.getBindings() returns an array with a single InstanceBinding with non empty class metadata with unmanaged injection', () => {
      let getPlanOptionsFixture: GetPlanOptions;
      let constructorArgumentMetadata: UnmanagedClassElementMetadata;
      let propertyArgumentMetadata: UnmanagedClassElementMetadata;
      let propertyKey: string;
      let classMetadataFixture: ClassMetadata;
      let instanceBindingFixture: InstanceBinding<unknown>;
      let result: unknown;

      beforeAll(() => {
        getPlanOptionsFixture = {
          isMultiple: false,
          name: undefined,
          optional: false,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          tag: undefined,
        };
        constructorArgumentMetadata = {
          kind: ClassElementMetadataKind.unmanaged,
        };
        propertyKey = 'property-key';
        propertyArgumentMetadata = {
          kind: ClassElementMetadataKind.unmanaged,
        };
        classMetadataFixture = {
          constructorArguments: [constructorArgumentMetadata],
          lifecycle: {
            postConstructMethodName: undefined,
            preDestroyMethodName: undefined,
          },
          properties: new Map([[propertyKey, propertyArgumentMetadata]]),
          scope: undefined,
        };
        instanceBindingFixture = {
          cache: {
            isRight: true,
            value: Symbol(),
          },
          id: 1,
          implementationType: class {},
          isSatisfiedBy: vitest.fn(() => true),
          moduleId: undefined,
          onActivation: undefined,
          onDeactivation: undefined,
          scope: bindingScopeValues.Singleton,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          type: bindingTypeValues.Instance,
        };

        vitest
          .mocked(buildGetPlanOptionsFromPlanParams)
          .mockReturnValueOnce(getPlanOptionsFixture);

        vitest
          .mocked(buildFilteredServiceBindings)
          .mockReturnValueOnce([instanceBindingFixture]);

        vitest
          .mocked(planParamsMock.operations.getClassMetadata)
          .mockReturnValueOnce(classMetadataFixture);

        result = plan(planParamsMock);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call buildGetPlanOptionsFromPlanParams()', () => {
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledTimes(1);
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledWith(
          planParamsMock,
        );
      });

      it('should call planParams.operations.getPlan()', () => {
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledTimes(1);
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledWith(
          getPlanOptionsFixture,
        );
      });

      it('should call buildFilteredServiceBindings()', () => {
        expect(buildFilteredServiceBindings).toHaveBeenCalledTimes(1);
        expect(buildFilteredServiceBindings).toHaveBeenCalledWith(
          planParamsMock,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
      });

      it('should return expected PlanResult', () => {
        const planServiceNodeBindings: PlanBindingNode[] = [];

        const planServiceNode: PlanServiceNode = {
          bindings: planServiceNodeBindings,
          isContextFree: true,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
        };

        const expected: PlanResult = {
          tree: {
            root: expect.objectContaining(planServiceNode),
          },
        };

        const instanceBindingNode: InstanceBindingNode = {
          binding: instanceBindingFixture,
          classMetadata: classMetadataFixture,
          constructorParams: [undefined],
          propertyParams: new Map(),
        };

        planServiceNodeBindings.push(instanceBindingNode);

        expect(result).toStrictEqual(expected);
      });
    });

    describe('when called, and params.getBindings() returns an array with a single ResolvedValueBinding with empty metadata', () => {
      let getPlanOptionsFixture: GetPlanOptions;
      let resolvedValueBindingFixture: Mocked<ResolvedValueBinding<unknown>>;
      let result: unknown;

      beforeAll(() => {
        getPlanOptionsFixture = {
          isMultiple: false,
          name: undefined,
          optional: false,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          tag: undefined,
        };
        resolvedValueBindingFixture = {
          cache: {
            isRight: true,
            value: Symbol(),
          },
          factory: vitest.fn(),
          id: 1,
          isSatisfiedBy: vitest.fn(),
          metadata: {
            arguments: [],
          },
          moduleId: undefined,
          onActivation: undefined,
          onDeactivation: undefined,
          scope: bindingScopeValues.Singleton,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          type: bindingTypeValues.ResolvedValue,
        };

        resolvedValueBindingFixture.isSatisfiedBy.mockReturnValueOnce(true);

        vitest
          .mocked(buildGetPlanOptionsFromPlanParams)
          .mockReturnValueOnce(getPlanOptionsFixture);

        vitest
          .mocked(buildFilteredServiceBindings)
          .mockReturnValueOnce([resolvedValueBindingFixture]);

        result = plan(planParamsMock);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call buildGetPlanOptionsFromPlanParams()', () => {
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledTimes(1);
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledWith(
          planParamsMock,
        );
      });

      it('should call planParams.operations.getPlan()', () => {
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledTimes(1);
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledWith(
          getPlanOptionsFixture,
        );
      });

      it('should call buildFilteredServiceBindings()', () => {
        expect(buildFilteredServiceBindings).toHaveBeenCalledTimes(1);
        expect(buildFilteredServiceBindings).toHaveBeenCalledWith(
          planParamsMock,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
      });

      it('should return expected PlanResult', () => {
        const planServiceNodeBindings: PlanBindingNode[] = [];

        const planServiceNode: PlanServiceNode = {
          bindings: planServiceNodeBindings,
          isContextFree: true,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
        };

        const expected: PlanResult = {
          tree: {
            root: expect.objectContaining(planServiceNode),
          },
        };

        const instanceBindingNode: ResolvedValueBindingNode = {
          binding: resolvedValueBindingFixture,
          params: [],
        };

        planServiceNodeBindings.push(instanceBindingNode);

        expect(result).toStrictEqual(expected);
      });
    });

    describe('when called, and params.getBindings() returns an array with a single ResolvedValueBinding with non empty metadata with multiple injection', () => {
      let getPlanOptionsFixture: GetPlanOptions;
      let constantValueBinding: ConstantValueBinding<unknown>;
      let resolvedValueElementMetadataFixture: ResolvedValueElementMetadata;
      let resolvedValueMetadataFixture: ResolvedValueMetadata;
      let resolvedValueBindingFixture: ResolvedValueBinding<unknown>;
      let result: unknown;

      beforeAll(() => {
        getPlanOptionsFixture = {
          isMultiple: false,
          name: undefined,
          optional: false,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          tag: undefined,
        };
        constantValueBinding = {
          cache: {
            isRight: true,
            value: Symbol(),
          },
          id: 1,
          isSatisfiedBy: vitest.fn(() => true),
          moduleId: undefined,
          onActivation: undefined,
          onDeactivation: undefined,
          scope: bindingScopeValues.Singleton,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          type: bindingTypeValues.ConstantValue,
          value: Symbol(),
        };
        resolvedValueElementMetadataFixture = {
          chained: false,
          kind: ResolvedValueElementMetadataKind.multipleInjection,
          name: undefined,
          optional: false,
          tags: new Map(),
          value: 'param-service-id',
        };
        resolvedValueMetadataFixture = {
          arguments: [resolvedValueElementMetadataFixture],
        };
        resolvedValueBindingFixture = {
          cache: {
            isRight: true,
            value: Symbol(),
          },
          factory: vitest.fn(),
          id: 1,
          isSatisfiedBy: vitest.fn(() => true),
          metadata: resolvedValueMetadataFixture,
          moduleId: undefined,
          onActivation: undefined,
          onDeactivation: undefined,
          scope: bindingScopeValues.Singleton,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          type: bindingTypeValues.ResolvedValue,
        };

        vitest
          .mocked(buildGetPlanOptionsFromPlanParams)
          .mockReturnValueOnce(getPlanOptionsFixture);

        vitest
          .mocked(buildFilteredServiceBindings)
          .mockReturnValueOnce([resolvedValueBindingFixture])
          .mockReturnValueOnce([constantValueBinding]);

        result = plan(planParamsMock);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call buildGetPlanOptionsFromPlanParams()', () => {
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledTimes(1);
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledWith(
          planParamsMock,
        );
      });

      it('should call planParams.getPlan()', () => {
        const expectedSecondGetPlanOptions: GetPlanOptions = {
          chained: false,
          isMultiple: true,
          name: undefined,
          optional: false,
          serviceIdentifier:
            resolvedValueElementMetadataFixture.value as ServiceIdentifier,
          tag: undefined,
        };

        expect(planParamsMock.operations.getPlan).toHaveBeenCalledTimes(2);
        expect(planParamsMock.operations.getPlan).toHaveBeenNthCalledWith(
          1,
          getPlanOptionsFixture,
        );
        expect(planParamsMock.operations.getPlan).toHaveBeenNthCalledWith(
          2,
          expectedSecondGetPlanOptions,
        );
      });

      it('should call buildFilteredServiceBindings()', () => {
        const expectedSublan: Mocked<SubplanParams> = {
          autobindOptions: planParamsMock.autobindOptions,
          node: expect.any(Object) as unknown as Mocked<PlanServiceNodeParent>,
          operations: planParamsMock.operations,
          servicesBranch: expect.any(Array) as unknown as ServiceIdentifier[],
        };

        expect(buildFilteredServiceBindings).toHaveBeenCalledTimes(2);
        expect(buildFilteredServiceBindings).toHaveBeenNthCalledWith(
          1,
          planParamsMock,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
        expect(buildFilteredServiceBindings).toHaveBeenNthCalledWith(
          2,
          expectedSublan,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
      });

      it('should return expected PlanResult', () => {
        const paramsPlanServiceNode: PlanServiceNode = {
          bindings: [
            {
              binding: constantValueBinding,
            },
          ],
          isContextFree: true,
          serviceIdentifier:
            resolvedValueElementMetadataFixture.value as ServiceIdentifier,
        };

        const resolvedValueBindingNode: ResolvedValueBindingNode = {
          binding: resolvedValueBindingFixture,
          params: [
            expect.objectContaining(paramsPlanServiceNode) as PlanServiceNode,
          ],
        };

        const planServiceNode: PlanServiceNode = {
          bindings: [resolvedValueBindingNode],
          isContextFree: true,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
        };

        const expected: PlanResult = {
          tree: {
            root: expect.objectContaining(planServiceNode),
          },
        };

        expect(result).toStrictEqual(expected);
      });
    });

    describe('when called, and params.getBindings() returns an array with a single ResolvedValueBinding with non empty metadata with single injection', () => {
      let getPlanOptionsFixture: GetPlanOptions;
      let constantValueBinding: ConstantValueBinding<unknown>;
      let resolvedValueElementMetadataFixture: ResolvedValueElementMetadata;
      let resolvedValueMetadataFixture: ResolvedValueMetadata;
      let resolvedValueBindingFixture: ResolvedValueBinding<unknown>;
      let result: unknown;

      beforeAll(() => {
        getPlanOptionsFixture = {
          isMultiple: false,
          name: undefined,
          optional: false,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          tag: undefined,
        };
        constantValueBinding = {
          cache: {
            isRight: true,
            value: Symbol(),
          },
          id: 1,
          isSatisfiedBy: vitest.fn(() => true),
          moduleId: undefined,
          onActivation: undefined,
          onDeactivation: undefined,
          scope: bindingScopeValues.Singleton,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          type: bindingTypeValues.ConstantValue,
          value: Symbol(),
        };
        resolvedValueElementMetadataFixture = {
          kind: ResolvedValueElementMetadataKind.singleInjection,
          name: undefined,
          optional: false,
          tags: new Map(),
          value: 'param-service-id',
        };
        resolvedValueMetadataFixture = {
          arguments: [resolvedValueElementMetadataFixture],
        };
        resolvedValueBindingFixture = {
          cache: {
            isRight: true,
            value: Symbol(),
          },
          factory: vitest.fn(),
          id: 1,
          isSatisfiedBy: vitest.fn(() => true),
          metadata: resolvedValueMetadataFixture,
          moduleId: undefined,
          onActivation: undefined,
          onDeactivation: undefined,
          scope: bindingScopeValues.Singleton,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          type: bindingTypeValues.ResolvedValue,
        };

        vitest
          .mocked(buildGetPlanOptionsFromPlanParams)
          .mockReturnValueOnce(getPlanOptionsFixture);

        vitest
          .mocked(buildFilteredServiceBindings)
          .mockReturnValueOnce([resolvedValueBindingFixture])
          .mockReturnValueOnce([constantValueBinding]);

        result = plan(planParamsMock);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call buildGetPlanOptionsFromPlanParams()', () => {
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledTimes(1);
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledWith(
          planParamsMock,
        );
      });

      it('should call planParams.getPlan()', () => {
        const expectedSecondGetPlanOptions: GetPlanOptions = {
          isMultiple: false,
          name: undefined,
          optional: false,
          serviceIdentifier:
            resolvedValueElementMetadataFixture.value as ServiceIdentifier,
          tag: undefined,
        };

        expect(planParamsMock.operations.getPlan).toHaveBeenCalledTimes(2);
        expect(planParamsMock.operations.getPlan).toHaveBeenNthCalledWith(
          1,
          getPlanOptionsFixture,
        );
        expect(planParamsMock.operations.getPlan).toHaveBeenNthCalledWith(
          2,
          expectedSecondGetPlanOptions,
        );
      });

      it('should call buildFilteredServiceBindings()', () => {
        const expectedSublan: Mocked<SubplanParams> = {
          autobindOptions: planParamsMock.autobindOptions,
          node: expect.any(Object) as unknown as Mocked<PlanServiceNodeParent>,
          operations: planParamsMock.operations,
          servicesBranch: expect.any(Array) as unknown as ServiceIdentifier[],
        };

        expect(buildFilteredServiceBindings).toHaveBeenCalledTimes(2);
        expect(buildFilteredServiceBindings).toHaveBeenNthCalledWith(
          1,
          planParamsMock,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
        expect(buildFilteredServiceBindings).toHaveBeenNthCalledWith(
          2,
          expectedSublan,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
      });

      it('should return expected PlanResult', () => {
        const paramsPlanServiceNode: PlanServiceNode = {
          bindings: undefined,
          isContextFree: true,
          serviceIdentifier:
            resolvedValueElementMetadataFixture.value as ServiceIdentifier,
        };

        (paramsPlanServiceNode as Writable<PlanServiceNode>).bindings = {
          binding: constantValueBinding,
        };

        const resolvedValueBindingNode: ResolvedValueBindingNode = {
          binding: resolvedValueBindingFixture,
          params: [expect.objectContaining(paramsPlanServiceNode)],
        };

        const planServiceNode: PlanServiceNode = {
          bindings: [resolvedValueBindingNode],
          isContextFree: true,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
        };

        const expected: PlanResult = {
          tree: {
            root: expect.objectContaining(planServiceNode),
          },
        };

        expect(result).toStrictEqual(expected);
      });
    });

    describe('when called, and params.getBindings() returns an array with a single ServiceRedirectionBinding with non existing target', () => {
      let getPlanOptionsFixture: GetPlanOptions;
      let serviceRedirectionBinding: ServiceRedirectionBinding<unknown>;
      let result: unknown;

      beforeAll(() => {
        getPlanOptionsFixture = {
          isMultiple: false,
          name: undefined,
          optional: false,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          tag: undefined,
        };
        serviceRedirectionBinding = {
          id: 1,
          isSatisfiedBy: vitest.fn(() => true),
          moduleId: undefined,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          targetServiceIdentifier: 'target-service-id',
          type: bindingTypeValues.ServiceRedirection,
        };

        vitest
          .mocked(buildGetPlanOptionsFromPlanParams)
          .mockReturnValueOnce(getPlanOptionsFixture);

        vitest
          .mocked(buildFilteredServiceBindings)
          .mockReturnValueOnce([serviceRedirectionBinding])
          .mockReturnValueOnce([]);

        result = plan(planParamsMock);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call buildGetPlanOptionsFromPlanParams()', () => {
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledTimes(1);
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledWith(
          planParamsMock,
        );
      });

      it('should call planParams.operations.getPlan()', () => {
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledTimes(1);
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledWith(
          getPlanOptionsFixture,
        );
      });

      it('should call buildFilteredServiceBindings()', () => {
        const expectedOptions: BuildFilteredServiceBindingsOptions = {
          chained: false,
          customServiceIdentifier:
            serviceRedirectionBinding.targetServiceIdentifier,
        };

        expect(buildFilteredServiceBindings).toHaveBeenCalledTimes(2);
        expect(buildFilteredServiceBindings).toHaveBeenNthCalledWith(
          1,
          planParamsMock,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
        expect(buildFilteredServiceBindings).toHaveBeenNthCalledWith(
          2,
          planParamsMock,
          expect.any(BindingConstraintsImplementation),
          expectedOptions,
        );
      });

      it('should return expected PlanResult', () => {
        const serviceRedirectionBindingNode: PlanServiceRedirectionBindingNode =
          {
            binding: serviceRedirectionBinding,
            redirections: [],
          };

        const planServiceNode: PlanServiceNode = {
          bindings: [serviceRedirectionBindingNode],
          isContextFree: true,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
        };

        const expected: PlanResult = {
          tree: {
            root: expect.objectContaining(planServiceNode),
          },
        };

        expect(result).toStrictEqual(expected);
      });
    });

    describe('when called, and params.getBindings() returns an array with a single ServiceRedirectionBinding with existing target', () => {
      let getPlanOptionsFixture: GetPlanOptions;
      let constantValueBinding: ConstantValueBinding<unknown>;
      let serviceRedirectionBinding: ServiceRedirectionBinding<unknown>;
      let result: unknown;

      beforeAll(() => {
        getPlanOptionsFixture = {
          isMultiple: false,
          name: undefined,
          optional: false,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          tag: undefined,
        };
        serviceRedirectionBinding = {
          id: 1,
          isSatisfiedBy: vitest.fn(() => true),
          moduleId: undefined,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          targetServiceIdentifier: 'target-service-id',
          type: bindingTypeValues.ServiceRedirection,
        };
        constantValueBinding = {
          cache: {
            isRight: true,
            value: Symbol(),
          },
          id: 1,
          isSatisfiedBy: vitest.fn(() => true),
          moduleId: undefined,
          onActivation: undefined,
          onDeactivation: undefined,
          scope: bindingScopeValues.Singleton,
          serviceIdentifier: serviceRedirectionBinding.targetServiceIdentifier,
          type: bindingTypeValues.ConstantValue,
          value: Symbol(),
        };

        vitest
          .mocked(buildGetPlanOptionsFromPlanParams)
          .mockReturnValueOnce(getPlanOptionsFixture);

        vitest
          .mocked(buildFilteredServiceBindings)
          .mockReturnValueOnce([serviceRedirectionBinding])
          .mockReturnValueOnce([constantValueBinding]);

        result = plan(planParamsMock);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call buildGetPlanOptionsFromPlanParams()', () => {
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledTimes(1);
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledWith(
          planParamsMock,
        );
      });

      it('should call planParams.operations.getPlan()', () => {
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledTimes(1);
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledWith(
          getPlanOptionsFixture,
        );
      });

      it('should call buildFilteredServiceBindings()', () => {
        const expectedOptions: BuildFilteredServiceBindingsOptions = {
          chained: false,
          customServiceIdentifier:
            serviceRedirectionBinding.targetServiceIdentifier,
        };

        expect(buildFilteredServiceBindings).toHaveBeenCalledTimes(2);
        expect(buildFilteredServiceBindings).toHaveBeenNthCalledWith(
          1,
          planParamsMock,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
        expect(buildFilteredServiceBindings).toHaveBeenNthCalledWith(
          2,
          planParamsMock,
          expect.any(BindingConstraintsImplementation),
          expectedOptions,
        );
      });

      it('should return expected PlanResult', () => {
        const planServiceNodeBindings: PlanBindingNode[] = [];

        const planServiceNode: PlanServiceNode = {
          bindings: planServiceNodeBindings,
          isContextFree: true,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
        };

        const expected: PlanResult = {
          tree: {
            root: expect.objectContaining(planServiceNode),
          },
        };

        const serviceRedirectionBindingNode: PlanServiceRedirectionBindingNode =
          {
            binding: serviceRedirectionBinding,
            redirections: [
              {
                binding: constantValueBinding,
              },
            ],
          };

        planServiceNodeBindings.push(serviceRedirectionBindingNode);

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe('having PlanParams with chained true and isMultiple true root constraint', () => {
    let planParamsMock: Mocked<PlanParams>;

    beforeAll(() => {
      planParamsMock = {
        autobindOptions: undefined,
        operations: {
          getBindings: vitest.fn() as unknown,
          getBindingsChained: vitest.fn() as unknown,
          getClassMetadata: vitest.fn() as unknown,
          getPlan: vitest.fn(),
          setBinding: vitest.fn() as unknown,
          setNonCachedServiceNode: vitest.fn(),
          setPlan: vitest.fn(),
        },
        rootConstraints: {
          chained: true,
          isMultiple: true,
          serviceIdentifier: 'service-id',
        },
        servicesBranch: [],
      } as Partial<Mocked<PlanParams>> as Mocked<PlanParams>;
    });

    describe('when called, and params.getBindings() returns undefined', () => {
      let getPlanOptionsFixture: GetPlanOptions;

      let result: unknown;

      beforeAll(() => {
        getPlanOptionsFixture = {
          isMultiple: false,
          name: undefined,
          optional: false,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          tag: undefined,
        };

        vitest
          .mocked(buildGetPlanOptionsFromPlanParams)
          .mockReturnValueOnce(getPlanOptionsFixture);

        vitest.mocked(buildFilteredServiceBindings).mockReturnValueOnce([]);

        result = plan(planParamsMock);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call buildGetPlanOptionsFromPlanParams()', () => {
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledTimes(1);
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledWith(
          planParamsMock,
        );
      });

      it('should call planParams.operations.getPlan()', () => {
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledTimes(1);
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledWith(
          getPlanOptionsFixture,
        );
      });

      it('should call buildFilteredServiceBindings()', () => {
        expect(buildFilteredServiceBindings).toHaveBeenCalledTimes(1);
        expect(buildFilteredServiceBindings).toHaveBeenCalledWith(
          planParamsMock,
          expect.any(BindingConstraintsImplementation),
          { chained: true },
        );
      });

      it('should return expected PlanResult', () => {
        const planServiceNode: PlanServiceNode = {
          bindings: [],
          isContextFree: true,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
        };

        const expected: PlanResult = {
          tree: {
            root: expect.objectContaining(planServiceNode),
          },
        };

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe('having PlanParams with isMultiple false root constraint', () => {
    let planParamsMock: Mocked<PlanParams>;

    beforeAll(() => {
      planParamsMock = {
        autobindOptions: undefined,
        operations: {
          getBindings: vitest.fn() as unknown,
          getBindingsChained: vitest.fn() as unknown,
          getClassMetadata: vitest.fn() as unknown,
          getPlan: vitest.fn(),
          setBinding: vitest.fn() as unknown,
          setNonCachedServiceNode: vitest.fn(),
          setPlan: vitest.fn(),
        },
        rootConstraints: {
          isMultiple: false,
          serviceIdentifier: 'service-id',
        },
        servicesBranch: [],
      } as Partial<Mocked<PlanParams>> as Mocked<PlanParams>;
    });

    describe('when called, and params.getBindings() returns undefined', () => {
      let getPlanOptionsFixture: GetPlanOptions;

      let result: unknown;

      beforeAll(() => {
        getPlanOptionsFixture = {
          isMultiple: false,
          name: undefined,
          optional: false,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
          tag: undefined,
        };

        vitest
          .mocked(buildGetPlanOptionsFromPlanParams)
          .mockReturnValueOnce(getPlanOptionsFixture);

        vitest.mocked(buildFilteredServiceBindings).mockReturnValueOnce([]);

        result = plan(planParamsMock);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call buildGetPlanOptionsFromPlanParams()', () => {
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledTimes(1);
        expect(buildGetPlanOptionsFromPlanParams).toHaveBeenCalledWith(
          planParamsMock,
        );
      });

      it('should call planParams.operations.getPlan()', () => {
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledTimes(1);
        expect(planParamsMock.operations.getPlan).toHaveBeenCalledWith(
          getPlanOptionsFixture,
        );
      });

      it('should call buildFilteredServiceBindings()', () => {
        expect(buildFilteredServiceBindings).toHaveBeenCalledTimes(1);
        expect(buildFilteredServiceBindings).toHaveBeenCalledWith(
          planParamsMock,
          expect.any(BindingConstraintsImplementation),
          { chained: false },
        );
      });

      it('should call checkServiceNodeSingleInjectionBindings()', () => {
        const expectedServiceNode: PlanServiceNode = {
          bindings: undefined,
          isContextFree: true,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
        };

        const expectedInternalBindingConstraintsNode: SingleInmutableLinkedListNode<InternalBindingConstraints> =
          {
            elem: {
              getAncestorsCalled: false,
              name: undefined,
              serviceIdentifier:
                planParamsMock.rootConstraints.serviceIdentifier,
              tags: new Map(),
            },
            previous: undefined,
          };

        expect(checkServiceNodeSingleInjectionBindings).toHaveBeenCalledTimes(
          1,
        );
        expect(checkServiceNodeSingleInjectionBindings).toHaveBeenCalledWith(
          expectedServiceNode,
          false,
          expectedInternalBindingConstraintsNode,
        );
      });

      it('should return expected PlanResult', () => {
        const planServiceNode: PlanServiceNode = {
          bindings: undefined,
          isContextFree: true,
          serviceIdentifier: planParamsMock.rootConstraints.serviceIdentifier,
        };

        const expected: PlanResult = {
          tree: {
            root: expect.objectContaining(planServiceNode),
          },
        };

        expect(result).toStrictEqual(expected);
      });
    });
  });
});
