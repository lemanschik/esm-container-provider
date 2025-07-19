import { Newable, ServiceIdentifier } from '@inversifyjs/common';

import { Binding } from '../../binding/models/Binding';
import { ClassMetadata } from '../../metadata/models/ClassMetadata';
import { BasePlanParamsAutobindOptions } from './BasePlanParamsAutobindOptions';
import { GetPlanOptions } from './GetPlanOptions';
import { PlanResult } from './PlanResult';

export interface BasePlanParams {
  autobindOptions: BasePlanParamsAutobindOptions | undefined;
  getBindings: <TInstance>(
    serviceIdentifier: ServiceIdentifier<TInstance>,
  ) => Iterable<Binding<TInstance>> | undefined;
  getBindingsChained: <TInstance>(
    serviceIdentifier: ServiceIdentifier<TInstance>,
  ) => Generator<Binding<TInstance>, void, unknown>;
  getClassMetadata: (type: Newable) => ClassMetadata;
  getPlan: (options: GetPlanOptions) => PlanResult | undefined;
  servicesBranch: ServiceIdentifier[];
  setBinding: <TInstance>(binding: Binding<TInstance>) => void;
  setPlan: (options: GetPlanOptions, planResult: PlanResult) => void;
}
