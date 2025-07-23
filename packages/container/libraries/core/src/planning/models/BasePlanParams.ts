import { ServiceIdentifier } from '@inversifyjs/common';

import { BasePlanParamsAutobindOptions } from './BasePlanParamsAutobindOptions';
import { PlanParamsOperations } from './PlanParamsOperations';

export interface BasePlanParams {
  autobindOptions: BasePlanParamsAutobindOptions | undefined;
  operations: PlanParamsOperations;
  servicesBranch: ServiceIdentifier[];
}
