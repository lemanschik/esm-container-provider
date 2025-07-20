import { ServiceIdentifier } from '@inversifyjs/common';

import { PlanBindingNode } from './PlanBindingNode';

export interface PlanServiceNode {
  readonly isContextFree: boolean;
  readonly bindings: PlanBindingNode | PlanBindingNode[] | undefined;
  readonly serviceIdentifier: ServiceIdentifier;
}
