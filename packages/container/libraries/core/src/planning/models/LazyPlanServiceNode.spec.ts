import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  Mock,
  vitest,
} from 'vitest';

import { LazyPlanServiceNode } from './LazyPlanServiceNode';
import { PlanBindingNode } from './PlanBindingNode';
import { PlanServiceNode } from './PlanServiceNode';

export class LazyPlanServiceNodeTest extends LazyPlanServiceNode {
  readonly #buildPlanServiceNodeMock: Mock<() => PlanServiceNode>;

  constructor(
    serviceNode: PlanServiceNode,
    buildPlanServiceNode: Mock<() => PlanServiceNode>,
  ) {
    super(serviceNode);

    this.#buildPlanServiceNodeMock = buildPlanServiceNode;
  }

  protected _buildPlanServiceNode(): PlanServiceNode {
    return this.#buildPlanServiceNodeMock();
  }
}

describe(LazyPlanServiceNode, () => {
  let buildPlanServiceNodeMock: Mock<() => PlanServiceNode>;

  beforeAll(() => {
    buildPlanServiceNodeMock = vitest.fn();
  });

  describe('.bindings', () => {
    describe('having a LazyPlanServiceNode with no node', () => {
      describe('when called', () => {
        let lazyPlanServiceNode: LazyPlanServiceNodeTest;

        let planServiceNodeFixture: PlanServiceNode;

        let result: unknown;

        beforeAll(() => {
          lazyPlanServiceNode = new LazyPlanServiceNodeTest(
            Symbol() as unknown as PlanServiceNode,
            buildPlanServiceNodeMock,
          );
          lazyPlanServiceNode.invalidate();

          planServiceNodeFixture = {
            bindings: Symbol() as unknown as PlanBindingNode,
            isContextFree: true,
            serviceIdentifier: Symbol(),
          };

          vitest
            .mocked(buildPlanServiceNodeMock)
            .mockReturnValueOnce(planServiceNodeFixture);

          result = lazyPlanServiceNode.bindings;
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call buildPlanServiceNode()', () => {
          expect(buildPlanServiceNodeMock).toHaveBeenCalledTimes(1);
          expect(buildPlanServiceNodeMock).toHaveBeenCalledWith();
        });

        it('should return expected value', () => {
          expect(result).toBe(planServiceNodeFixture.bindings);
        });
      });
    });

    describe('having a LazyPlanServiceNode with node', () => {
      describe('when called', () => {
        let planServiceNodeFixture: PlanServiceNode;
        let lazyPlanServiceNode: LazyPlanServiceNode;

        let result: unknown;

        beforeAll(() => {
          planServiceNodeFixture = {
            bindings: Symbol() as unknown as PlanBindingNode,
            isContextFree: true,
            serviceIdentifier: Symbol(),
          };

          lazyPlanServiceNode = new LazyPlanServiceNodeTest(
            planServiceNodeFixture,
            buildPlanServiceNodeMock,
          );

          result = lazyPlanServiceNode.bindings;
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should not call buildPlanServiceNode()', () => {
          expect(buildPlanServiceNodeMock).not.toHaveBeenCalled();
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
        let lazyPlanServiceNode: LazyPlanServiceNodeTest;

        let planServiceNodeFixture: PlanServiceNode;

        let result: unknown;

        beforeAll(() => {
          lazyPlanServiceNode = new LazyPlanServiceNodeTest(
            Symbol() as unknown as PlanServiceNode,
            buildPlanServiceNodeMock,
          );
          lazyPlanServiceNode.invalidate();

          planServiceNodeFixture = {
            bindings: Symbol() as unknown as PlanBindingNode,
            isContextFree: true,
            serviceIdentifier: Symbol(),
          };

          vitest
            .mocked(buildPlanServiceNodeMock)
            .mockReturnValueOnce(planServiceNodeFixture);

          result = lazyPlanServiceNode.isContextFree;
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should call buildPlanServiceNode()', () => {
          expect(buildPlanServiceNodeMock).toHaveBeenCalledTimes(1);
          expect(buildPlanServiceNodeMock).toHaveBeenCalledWith();
        });

        it('should return expected value', () => {
          expect(result).toBe(planServiceNodeFixture.isContextFree);
        });
      });
    });

    describe('having a LazyPlanServiceNode with node', () => {
      describe('when called', () => {
        let planServiceNodeFixture: PlanServiceNode;
        let lazyPlanServiceNode: LazyPlanServiceNode;

        let result: unknown;

        beforeAll(() => {
          planServiceNodeFixture = {
            bindings: Symbol() as unknown as PlanBindingNode,
            isContextFree: true,
            serviceIdentifier: Symbol(),
          };

          lazyPlanServiceNode = new LazyPlanServiceNodeTest(
            planServiceNodeFixture,
            buildPlanServiceNodeMock,
          );

          result = lazyPlanServiceNode.isContextFree;
        });

        afterAll(() => {
          vitest.clearAllMocks();
        });

        it('should not call buildPlanServiceNode()', () => {
          expect(buildPlanServiceNodeMock).not.toHaveBeenCalled();
        });

        it('should return expected value', () => {
          expect(result).toBe(planServiceNodeFixture.isContextFree);
        });
      });
    });
  });

  describe('.serviceIdentifier', () => {
    describe('when called', () => {
      let planServiceNodeFixture: PlanServiceNode;
      let lazyPlanServiceNode: LazyPlanServiceNode;

      let result: unknown;

      beforeAll(() => {
        planServiceNodeFixture = {
          bindings: Symbol() as unknown as PlanBindingNode,
          isContextFree: true,
          serviceIdentifier: Symbol(),
        };

        lazyPlanServiceNode = new LazyPlanServiceNodeTest(
          planServiceNodeFixture,
          buildPlanServiceNodeMock,
        );

        result = lazyPlanServiceNode.serviceIdentifier;
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should not call buildPlanServiceNode()', () => {
        expect(buildPlanServiceNodeMock).not.toHaveBeenCalled();
      });

      it('should return expected value', () => {
        expect(result).toBe(planServiceNodeFixture.serviceIdentifier);
      });
    });
  });
});
