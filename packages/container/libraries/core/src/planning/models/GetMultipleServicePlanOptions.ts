import { BaseGetPlanOptions } from './BaseGetPlanOptions';

export interface GetMultipleServicePlanOptions extends BaseGetPlanOptions {
  chained: boolean;
  isMultiple: true;
}
