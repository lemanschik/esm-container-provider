import { beforeAll, describe, expect, it, Mocked, vitest } from 'vitest';

import { GetPlanOptions } from '../models/GetPlanOptions';
import { PlanResult } from '../models/PlanResult';
import { PlanResultCacheService } from './PlanResultCacheService';

const planOptionsAndStringDescriptionPairList: [string, GetPlanOptions][] = [
  [
    'isMultiple false and optional false',
    {
      isMultiple: false,
      name: undefined,
      optional: false,
      serviceIdentifier: 'service-id',
      tag: undefined,
    },
  ],
  [
    'isMultiple false and optional true',
    {
      isMultiple: false,
      name: undefined,
      optional: true,
      serviceIdentifier: 'service-id',
      tag: undefined,
    },
  ],
  [
    'isMultiple true and optional false',
    {
      chained: false,
      isMultiple: true,
      name: undefined,
      optional: false,
      serviceIdentifier: 'service-id',
      tag: undefined,
    },
  ],
  [
    'isMultiple true and optional true',
    {
      chained: false,
      isMultiple: true,
      name: undefined,
      optional: true,
      serviceIdentifier: 'service-id',
      tag: undefined,
    },
  ],
  [
    'isMultiple false, optional false and name',
    {
      isMultiple: false,
      name: 'name',
      optional: false,
      serviceIdentifier: 'service-id',
      tag: undefined,
    },
  ],
  [
    'isMultiple false, optional true and name',
    {
      isMultiple: false,
      name: 'name',
      optional: true,
      serviceIdentifier: 'service-id',
      tag: undefined,
    },
  ],
  [
    'isMultiple true, optional false and name',
    {
      chained: false,
      isMultiple: true,
      name: 'name',
      optional: false,
      serviceIdentifier: 'service-id',
      tag: undefined,
    },
  ],
  [
    'isMultiple true, optional true and name',
    {
      chained: false,
      isMultiple: true,
      name: 'name',
      optional: true,
      serviceIdentifier: 'service-id',
      tag: undefined,
    },
  ],
  [
    'isMultiple false, optional false and tag',
    {
      isMultiple: false,
      name: undefined,
      optional: false,
      serviceIdentifier: 'service-id',
      tag: {
        key: 'key',
        value: 'value',
      },
    },
  ],
  [
    'isMultiple false, optional true and tag',
    {
      isMultiple: false,
      name: undefined,
      optional: true,
      serviceIdentifier: 'service-id',
      tag: {
        key: 'key',
        value: 'value',
      },
    },
  ],
  [
    'isMultiple true, optional false and tag',
    {
      chained: false,
      isMultiple: true,
      name: undefined,
      optional: false,
      serviceIdentifier: 'service-id',
      tag: {
        key: 'key',
        value: 'value',
      },
    },
  ],
  [
    'isMultiple true, optional true and tag',
    {
      chained: false,
      isMultiple: true,
      name: undefined,
      optional: true,
      serviceIdentifier: 'service-id',
      tag: {
        key: 'key',
        value: 'value',
      },
    },
  ],
  [
    'isMultiple false, optional false, name and tag',
    {
      isMultiple: false,
      name: 'name',
      optional: false,
      serviceIdentifier: 'service-id',
      tag: {
        key: 'key',
        value: 'value',
      },
    },
  ],
  [
    'isMultiple false, optional true, name and tag',
    {
      isMultiple: false,
      name: 'name',
      optional: true,
      serviceIdentifier: 'service-id',
      tag: {
        key: 'key',
        value: 'value',
      },
    },
  ],
  [
    'isMultiple true, optional false, name and tag',
    {
      chained: false,
      isMultiple: true,
      name: 'name',
      optional: false,
      serviceIdentifier: 'service-id',
      tag: {
        key: 'key',
        value: 'value',
      },
    },
  ],
  [
    'isMultiple true, optional true, name and tag',
    {
      chained: false,
      isMultiple: true,
      name: 'name',
      optional: true,
      serviceIdentifier: 'service-id',
      tag: {
        key: 'key',
        value: 'value',
      },
    },
  ],
  [
    'chained true, isMultiple true and optional false',
    {
      chained: true,
      isMultiple: true,
      name: undefined,
      optional: false,
      serviceIdentifier: 'service-id',
      tag: undefined,
    },
  ],
  [
    'chained true, isMultiple true and optional true',
    {
      chained: true,
      isMultiple: true,
      name: undefined,
      optional: true,
      serviceIdentifier: 'service-id',
      tag: undefined,
    },
  ],
  [
    'chained true, isMultiple true, optional false and name',
    {
      chained: true,
      isMultiple: true,
      name: 'name',
      optional: false,
      serviceIdentifier: 'service-id',
      tag: undefined,
    },
  ],
  [
    'chained true, isMultiple true, optional true and name',
    {
      chained: true,
      isMultiple: true,
      name: 'name',
      optional: true,
      serviceIdentifier: 'service-id',
      tag: undefined,
    },
  ],
  [
    'chained true, isMultiple true, optional false and tag',
    {
      chained: true,
      isMultiple: true,
      name: undefined,
      optional: false,
      serviceIdentifier: 'service-id',
      tag: {
        key: 'key',
        value: 'value',
      },
    },
  ],
  [
    'chained true, isMultiple true, optional true and tag',
    {
      chained: true,
      isMultiple: true,
      name: undefined,
      optional: true,
      serviceIdentifier: 'service-id',
      tag: {
        key: 'key',
        value: 'value',
      },
    },
  ],
  [
    'chained true, isMultiple true, optional false, name and tag',
    {
      chained: true,
      isMultiple: true,
      name: 'name',
      optional: false,
      serviceIdentifier: 'service-id',
      tag: {
        key: 'key',
        value: 'value',
      },
    },
  ],
  [
    'chained true, isMultiple true, optional true, name and tag',
    {
      chained: true,
      isMultiple: true,
      name: 'name',
      optional: true,
      serviceIdentifier: 'service-id',
      tag: {
        key: 'key',
        value: 'value',
      },
    },
  ],
];

const planOptionsList: GetPlanOptions[] =
  planOptionsAndStringDescriptionPairList.map(
    ([_, options]: [string, GetPlanOptions]) => options,
  );

const stringDescriptionAndPlanOptionsAndOtherPlanOptionsListTupleList: [
  string,
  GetPlanOptions,
  GetPlanOptions[],
][] = planOptionsAndStringDescriptionPairList.map(
  ([stringDescription, options]: [string, GetPlanOptions]) => [
    stringDescription,
    options,
    planOptionsList.filter(
      (planOptions: GetPlanOptions) => planOptions !== options,
    ),
  ],
);

describe(PlanResultCacheService, () => {
  describe('.set', () => {
    describe.each<[string, GetPlanOptions, GetPlanOptions[]]>(
      stringDescriptionAndPlanOptionsAndOtherPlanOptionsListTupleList,
    )(
      'having options with  %s',
      (_: string, options: GetPlanOptions, otherPlans: GetPlanOptions[]) => {
        describe('when called', () => {
          let planService: PlanResultCacheService;

          let planResultFixture: PlanResult;

          beforeAll(() => {
            planService = new PlanResultCacheService();

            planResultFixture = {} as PlanResult;
            planService.set(options, planResultFixture);
          });

          it('should store the plan result', () => {
            expect(planService.get(options)).toBe(planResultFixture);
          });

          it('should not store the plan result for other options', () => {
            for (const otherPlan of otherPlans) {
              expect(planService.get(otherPlan)).toBeUndefined();
            }
          });
        });
      },
    );
  });

  describe('.clearCache', () => {
    let options: GetPlanOptions;

    beforeAll(() => {
      options = {
        isMultiple: false,
        name: undefined,
        optional: false,
        serviceIdentifier: 'service-id',
        tag: undefined,
      };
    });

    describe('when called', () => {
      let planService: PlanResultCacheService;

      let planResult: PlanResult;

      beforeAll(() => {
        planService = new PlanResultCacheService();

        planResult = {} as PlanResult;
        planService.set(options, planResult);
        planService.clearCache();
      });

      it('should clear the cache', () => {
        expect(planService.get(options)).toBeUndefined();
      });
    });

    describe('when called with subscribers', () => {
      let planService: PlanResultCacheService;
      let subscriberMock: Mocked<PlanResultCacheService>;

      beforeAll(() => {
        planService = new PlanResultCacheService();
        subscriberMock = {
          clearCache: vitest.fn(),
          // ...other mocked methods...
        } as unknown as Mocked<PlanResultCacheService>;

        planService.subscribe(subscriberMock);
        planService.clearCache();
      });

      it('should call subscriber.clearCache()', () => {
        expect(subscriberMock.clearCache).toHaveBeenCalledTimes(1);
        expect(subscriberMock.clearCache).toHaveBeenCalledWith();
      });
    });
  });
});
