import { ServiceIdentifier } from '@inversifyjs/common';

import { buildPlanServiceNode } from '../actions/plan';
import { PlanBindingNode } from './PlanBindingNode';
import { PlanParams } from './PlanParams';
import { PlanServiceNode } from './PlanServiceNode';

export class LazyPlanServiceNode implements PlanServiceNode {
  readonly #planParams: PlanParams;
  #serviceNode: PlanServiceNode | undefined;

  constructor(planParams: PlanParams, serviceNode: PlanServiceNode) {
    this.#planParams = planParams;
    this.#serviceNode = serviceNode;
  }

  public get bindings(): PlanBindingNode | PlanBindingNode[] | undefined {
    return this.#getNode().bindings;
  }

  public get isContextFree(): boolean {
    return this.#getNode().isContextFree;
  }

  public get serviceIdentifier(): ServiceIdentifier {
    return this.#planParams.rootConstraints.serviceIdentifier;
  }

  public invalidate(): void {
    this.#serviceNode = undefined;
  }

  #getNode(): PlanServiceNode {
    if (this.#serviceNode === undefined) {
      this.#serviceNode = buildPlanServiceNode(this.#planParams);
    }

    return this.#serviceNode;
  }
}
