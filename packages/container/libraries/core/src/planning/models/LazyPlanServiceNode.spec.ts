import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

vitest.mock('../actions/plan');

import { buildPlanServiceNode } from '../actions/plan';
import { LazyPlanServiceNode } from './LazyPlanServiceNode';
import { PlanBindingNode } from './PlanBindingNode';
import { PlanParams } from './PlanParams';
import { PlanServiceNode } from './PlanServiceNode';

describe(LazyPlanServiceNode, () => {
  describe('.bindings', () => {
    describe('having a LazyPlanServiceNode with no node', () => {
      describe('when called', () => {
        let planParamsFixture: PlanParams;
        let lazyPlanServiceNode: LazyPlanServiceNode;

        let planServiceNodeFixture: PlanServiceNode;

        let result: unknown;

        beforeAll(() => {
          planParamsFixture = Symbol() as unknown as PlanParams;
          lazyPlanServiceNode = new LazyPlanServiceNode(
            planParamsFixture,
            Symbol() as unknown as PlanServiceNode,
          );
          lazyPlanServiceNode.invalidate();

          planServiceNodeFixture = {
            bindings: Symbol() as unknown as PlanBindingNode,
            isContextFree: true,
            serviceIdentifier: Symbol(),
          };

          vitest
            .mocked(buildPlanServiceNode)
            .mockReturnValueOnce(planServiceNodeFixture);

          result = lazyPlanServiceNode.bindings;
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call buildPlanServiceNode()', () => {
          expect(buildPlanServiceNode).toHaveBeenCalledTimes(1);
          expect(buildPlanServiceNode).toHaveBeenCalledWith(planParamsFixture);
        });

        it('should return expected value', () => {
          expect(result).toBe(planServiceNodeFixture.bindings);
        });
      });
    });

    describe('having a LazyPlanServiceNode with node', () => {
      describe('when called', () => {
        let planParamsFixture: PlanParams;
        let planServiceNodeFixture: PlanServiceNode;
        let lazyPlanServiceNode: LazyPlanServiceNode;

        let result: unknown;

        beforeAll(() => {
          planParamsFixture = Symbol() as unknown as PlanParams;
          planServiceNodeFixture = {
            bindings: Symbol() as unknown as PlanBindingNode,
            isContextFree: true,
            serviceIdentifier: Symbol(),
          };

          lazyPlanServiceNode = new LazyPlanServiceNode(
            planParamsFixture,
            planServiceNodeFixture,
          );

          result = lazyPlanServiceNode.bindings;
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should not call buildPlanServiceNode()', () => {
          expect(buildPlanServiceNode).not.toHaveBeenCalled();
        });

        it('should return expected value', () => {
          expect(result).toBe(planServiceNodeFixture.bindings);
        });
      });
    });
  });

  describe('.isContextFree', () => {
    describe('having a LazyPlanServiceNode with no node', () => {
      describe('when called', () => {
        let planParamsFixture: PlanParams;
        let lazyPlanServiceNode: LazyPlanServiceNode;

        let planServiceNodeFixture: PlanServiceNode;

        let result: unknown;

        beforeAll(() => {
          planParamsFixture = Symbol() as unknown as PlanParams;
          lazyPlanServiceNode = new LazyPlanServiceNode(
            planParamsFixture,
            Symbol() as unknown as PlanServiceNode,
          );
          lazyPlanServiceNode.invalidate();

          planServiceNodeFixture = {
            bindings: undefined,
            isContextFree: true,
            serviceIdentifier: Symbol(),
          };

          vitest
            .mocked(buildPlanServiceNode)
            .mockReturnValueOnce(planServiceNodeFixture);

          result = lazyPlanServiceNode.isContextFree;
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call buildPlanServiceNode()', () => {
          expect(buildPlanServiceNode).toHaveBeenCalledTimes(1);
          expect(buildPlanServiceNode).toHaveBeenCalledWith(planParamsFixture);
        });

        it('should return expected value', () => {
          expect(result).toBe(planServiceNodeFixture.isContextFree);
        });
      });
    });

    describe('having a LazyPlanServiceNode with node', () => {
      describe('when called', () => {
        let planParamsFixture: PlanParams;
        let planServiceNodeFixture: PlanServiceNode;
        let lazyPlanServiceNode: LazyPlanServiceNode;

        let result: unknown;

        beforeAll(() => {
          planParamsFixture = Symbol() as unknown as PlanParams;
          planServiceNodeFixture = {
            bindings: undefined,
            isContextFree: true,
            serviceIdentifier: Symbol(),
          };

          lazyPlanServiceNode = new LazyPlanServiceNode(
            planParamsFixture,
            planServiceNodeFixture,
          );

          result = lazyPlanServiceNode.isContextFree;
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should not call buildPlanServiceNode()', () => {
          expect(buildPlanServiceNode).not.toHaveBeenCalled();
        });

        it('should return expected value', () => {
          expect(result).toBe(planServiceNodeFixture.isContextFree);
        });
      });
    });
  });

  describe('.serviceIdentifier', () => {
    describe('having a LazyPlanServiceNode with node', () => {
      describe('when called', () => {
        let planParamsFixture: PlanParams;
        let planServiceNodeFixture: PlanServiceNode;
        let lazyPlanServiceNode: LazyPlanServiceNode;

        let result: unknown;

        beforeAll(() => {
          planParamsFixture = {
            rootConstraints: {
              isMultiple: false,
              serviceIdentifier: Symbol(),
            },
          } as Partial<PlanParams> as PlanParams;
          planServiceNodeFixture = {
            bindings: undefined,
            isContextFree: true,
            serviceIdentifier: Symbol(),
          };

          lazyPlanServiceNode = new LazyPlanServiceNode(
            planParamsFixture,
            planServiceNodeFixture,
          );

          result = lazyPlanServiceNode.serviceIdentifier;
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should not call buildPlanServiceNode()', () => {
          expect(buildPlanServiceNode).not.toHaveBeenCalled();
        });

        it('should return expected value', () => {
          expect(result).toBe(
            planParamsFixture.rootConstraints.serviceIdentifier,
          );
        });
      });
    });
  });
});
