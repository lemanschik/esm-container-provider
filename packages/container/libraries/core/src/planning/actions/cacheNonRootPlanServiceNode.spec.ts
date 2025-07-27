import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  Mocked,
  vitest,
} from 'vitest';

import { GetPlanOptionsFixtures } from '../fixtures/GetPlanOptionsFixtures';
import { GetPlanOptions } from '../models/GetPlanOptions';
import { PlanParamsOperations } from '../models/PlanParamsOperations';
import { PlanServiceNode } from '../models/PlanServiceNode';
import { cacheNonRootPlanServiceNode } from './cacheNonRootPlanServiceNode';

describe(cacheNonRootPlanServiceNode, () => {
  let operationsMock: Mocked<PlanParamsOperations>;

  beforeAll(() => {
    operationsMock = {
      setNonCachedServiceNode: vitest.fn(),
      setPlan: vitest.fn(),
    } as Partial<Mocked<PlanParamsOperations>> as Mocked<PlanParamsOperations>;
  });

  describe('having GetPlanOptions undefined', () => {
    let planServiceNodeFixture: PlanServiceNode;

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        planServiceNodeFixture = Symbol() as unknown as PlanServiceNode;

        result = cacheNonRootPlanServiceNode(
          undefined,
          operationsMock,
          planServiceNodeFixture,
        );
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call operations.setNonCachedServiceNode()', () => {
        expect(operationsMock.setNonCachedServiceNode).toHaveBeenCalledTimes(1);
        expect(operationsMock.setNonCachedServiceNode).toHaveBeenCalledWith(
          planServiceNodeFixture,
        );
      });

      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });
  });

  describe('having PlanServiceNode with isContextFree false', () => {
    let getPlanOptionsFixture: GetPlanOptions;
    let planServiceNodeFixture: PlanServiceNode;

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        getPlanOptionsFixture = GetPlanOptionsFixtures.any;

        planServiceNodeFixture = {
          bindings: undefined,
          isContextFree: false,
          serviceIdentifier: Symbol(),
        };

        result = cacheNonRootPlanServiceNode(
          getPlanOptionsFixture,
          operationsMock,
          planServiceNodeFixture,
        );
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call operations.setNonCachedServiceNode()', () => {
        expect(operationsMock.setNonCachedServiceNode).toHaveBeenCalledTimes(1);
        expect(operationsMock.setNonCachedServiceNode).toHaveBeenCalledWith(
          planServiceNodeFixture,
        );
      });

      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });
  });

  describe('having PlanServiceNode with isContextFree true', () => {
    let getPlanOptionsFixture: GetPlanOptions;
    let planServiceNodeFixture: PlanServiceNode;

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        getPlanOptionsFixture = GetPlanOptionsFixtures.any;

        planServiceNodeFixture = {
          bindings: undefined,
          isContextFree: true,
          serviceIdentifier: Symbol(),
        };

        result = cacheNonRootPlanServiceNode(
          getPlanOptionsFixture,
          operationsMock,
          planServiceNodeFixture,
        );
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call operations.setPlan()', () => {
        expect(operationsMock.setPlan).toHaveBeenCalledTimes(1);
        expect(operationsMock.setPlan).toHaveBeenCalledWith(
          getPlanOptionsFixture,
          {
            tree: {
              root: planServiceNodeFixture,
            },
          },
        );
      });

      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });
  });
});
