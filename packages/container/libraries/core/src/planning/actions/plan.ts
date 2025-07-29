import { ServiceIdentifier } from '@inversifyjs/common';

import { Binding } from '../../binding/models/Binding';
import { BindingConstraints } from '../../binding/models/BindingConstraints';
import {
  BindingConstraintsImplementation,
  InternalBindingConstraints,
} from '../../binding/models/BindingConstraintsImplementation';
import { bindingTypeValues } from '../../binding/models/BindingType';
import { InstanceBinding } from '../../binding/models/InstanceBinding';
import { ResolvedValueBinding } from '../../binding/models/ResolvedValueBinding';
import { ServiceRedirectionBinding } from '../../binding/models/ServiceRedirectionBinding';
import { SingleInmutableLinkedList } from '../../common/models/SingleInmutableLinkedList';
import { Writable } from '../../common/models/Writable';
import { ClassElementMetadata } from '../../metadata/models/ClassElementMetadata';
import { ClassElementMetadataKind } from '../../metadata/models/ClassElementMetadataKind';
import { ClassMetadata } from '../../metadata/models/ClassMetadata';
import { ManagedClassElementMetadata } from '../../metadata/models/ManagedClassElementMetadata';
import { ResolvedValueElementMetadata } from '../../metadata/models/ResolvedValueElementMetadata';
import { ResolvedValueElementMetadataKind } from '../../metadata/models/ResolvedValueElementMetadataKind';
import { ResolvedValueMetadata } from '../../metadata/models/ResolvedValueMetadata';
import { buildFilteredServiceBindings } from '../calculations/buildFilteredServiceBindings';
import { buildGetPlanOptionsFromPlanParams } from '../calculations/buildGetPlanOptionsFromPlanParams';
import { buildPlanBindingConstraintsList } from '../calculations/buildPlanBindingConstraintsList';
import { checkServiceNodeSingleInjectionBindings } from '../calculations/checkServiceNodeSingleInjectionBindings';
import { getServiceFromMaybeLazyServiceIdentifier } from '../calculations/getServiceFromMaybeLazyServiceIdentifier';
import { handlePlanError } from '../calculations/handlePlanError';
import { isInstanceBindingNode } from '../calculations/isInstanceBindingNode';
import { isPlanServiceRedirectionBindingNode } from '../calculations/isPlanServiceRedirectionBindingNode';
import { tryBuildGetPlanOptionsFromManagedClassElementMetadata } from '../calculations/tryBuildGetPlanOptionsFromManagedClassElementMetadata';
import { tryBuildGetPlanOptionsFromResolvedValueElementMetadata } from '../calculations/tryBuildGetPlanOptionsFromResolvedValueElementMetadata';
import { BasePlanParams } from '../models/BasePlanParams';
import { BindingNodeParent } from '../models/BindingNodeParent';
import { GetPlanOptions } from '../models/GetPlanOptions';
import { InstanceBindingNode } from '../models/InstanceBindingNode';
import { LazyPlanServiceNode } from '../models/LazyPlanServiceNode';
import { PlanBindingNode } from '../models/PlanBindingNode';
import { PlanParams } from '../models/PlanParams';
import { PlanResult } from '../models/PlanResult';
import { PlanServiceNode } from '../models/PlanServiceNode';
import { PlanServiceRedirectionBindingNode } from '../models/PlanServiceRedirectionBindingNode';
import { ResolvedValueBindingNode } from '../models/ResolvedValueBindingNode';
import { SubplanParams } from '../models/SubplanParams';
import { cacheNonRootPlanServiceNode } from './cacheNonRootPlanServiceNode';

class LazyRootPlanServiceNode extends LazyPlanServiceNode {
  readonly #params: PlanParams;

  constructor(params: PlanParams, serviceNode: PlanServiceNode) {
    super(serviceNode);

    this.#params = params;
  }

  protected override _buildPlanServiceNode(): PlanServiceNode {
    return buildPlanServiceNode(this.#params);
  }
}

class LazyManagedClassMetadataPlanServiceNode extends LazyPlanServiceNode {
  readonly #params: SubplanParams;
  readonly #bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>;
  readonly #elementMetadata: ManagedClassElementMetadata;

  constructor(
    params: SubplanParams,
    bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>,
    elementMetadata: ManagedClassElementMetadata,
    serviceNode: PlanServiceNode,
  ) {
    super(serviceNode);

    this.#params = params;
    this.#bindingConstraintsList = bindingConstraintsList;
    this.#elementMetadata = elementMetadata;
  }

  protected override _buildPlanServiceNode(): PlanServiceNode {
    return buildPlanServiceNodeFromClassElementMetadata(
      this.#params,
      this.#bindingConstraintsList,
      this.#elementMetadata,
    );
  }
}

class LazyResolvedValueMetadataPlanServiceNode extends LazyPlanServiceNode {
  readonly #params: SubplanParams;
  readonly #bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>;
  readonly #resolvedValueElementMetadata: ResolvedValueElementMetadata;

  constructor(
    params: SubplanParams,
    bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>,
    resolvedValueElementMetadata: ResolvedValueElementMetadata,
    serviceNode: PlanServiceNode,
  ) {
    super(serviceNode);

    this.#params = params;
    this.#bindingConstraintsList = bindingConstraintsList;
    this.#resolvedValueElementMetadata = resolvedValueElementMetadata;
  }

  protected override _buildPlanServiceNode(): PlanServiceNode {
    return buildPlanServiceNodeFromResolvedValueElementMetadata(
      this.#params,
      this.#bindingConstraintsList,
      this.#resolvedValueElementMetadata,
    );
  }
}

function buildPlanServiceNode(params: PlanParams): PlanServiceNode {
  const bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints> =
    buildPlanBindingConstraintsList(params);

  const bindingConstraints: BindingConstraints =
    new BindingConstraintsImplementation(bindingConstraintsList.last);

  const chained: boolean = params.rootConstraints.isMultiple
    ? params.rootConstraints.chained
    : false;

  const filteredServiceBindings: Binding<unknown>[] =
    buildFilteredServiceBindings(params, bindingConstraints, {
      chained,
    });

  const serviceNodeBindings: PlanBindingNode[] = [];

  const serviceNode: PlanServiceNode = {
    bindings: serviceNodeBindings,
    isContextFree: true,
    serviceIdentifier: params.rootConstraints.serviceIdentifier,
  };

  serviceNodeBindings.push(
    ...buildServiceNodeBindings(
      params,
      bindingConstraintsList,
      filteredServiceBindings,
      serviceNode,
      chained,
    ),
  );

  serviceNode.isContextFree =
    !bindingConstraintsList.last.elem.getAncestorsCalled;

  if (!params.rootConstraints.isMultiple) {
    checkServiceNodeSingleInjectionBindings(
      serviceNode,
      params.rootConstraints.isOptional ?? false,
      bindingConstraintsList.last,
    );

    const [planBindingNode]: PlanBindingNode[] = serviceNodeBindings;

    (serviceNode as Writable<PlanServiceNode>).bindings = planBindingNode;
  }

  return serviceNode;
}

export function plan(params: PlanParams): PlanResult {
  try {
    const getPlanOptions: GetPlanOptions =
      buildGetPlanOptionsFromPlanParams(params);

    const planResultFromCache: PlanResult | undefined =
      params.operations.getPlan(getPlanOptions);

    if (planResultFromCache !== undefined) {
      return planResultFromCache;
    }

    const serviceNode: PlanServiceNode = buildPlanServiceNode(params);

    const planResult: PlanResult = {
      tree: {
        root: new LazyRootPlanServiceNode(params, serviceNode),
      },
    };

    // Set the plan result in the cache no matter what, even if the plan is context dependent
    params.operations.setPlan(getPlanOptions, planResult);

    return planResult;
  } catch (error: unknown) {
    handlePlanError(params, error);
  }
}

function buildInstancePlanBindingNode(
  params: BasePlanParams,
  binding: InstanceBinding<unknown>,
  bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>,
): PlanBindingNode {
  const classMetadata: ClassMetadata = params.operations.getClassMetadata(
    binding.implementationType,
  );

  const childNode: InstanceBindingNode = {
    binding: binding,
    classMetadata,
    constructorParams: [],
    propertyParams: new Map(),
  };

  const subplanParams: SubplanParams = {
    autobindOptions: params.autobindOptions,
    node: childNode,
    operations: params.operations,
    servicesBranch: params.servicesBranch,
  };

  return subplan(subplanParams, bindingConstraintsList);
}

function buildPlanServiceNodeFromClassElementMetadata(
  params: SubplanParams,
  bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>,
  elementMetadata: ManagedClassElementMetadata,
): PlanServiceNode {
  const serviceIdentifier: ServiceIdentifier =
    getServiceFromMaybeLazyServiceIdentifier(elementMetadata.value);

  const updatedBindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints> =
    bindingConstraintsList.concat({
      getAncestorsCalled: false,
      name: elementMetadata.name,
      serviceIdentifier,
      tags: elementMetadata.tags,
    });

  const bindingConstraints: BindingConstraints =
    new BindingConstraintsImplementation(updatedBindingConstraintsList.last);

  const chained: boolean =
    elementMetadata.kind === ClassElementMetadataKind.multipleInjection
      ? elementMetadata.chained
      : false;

  const filteredServiceBindings: Binding<unknown>[] =
    buildFilteredServiceBindings(params, bindingConstraints, {
      chained,
    });

  const serviceNodeBindings: PlanBindingNode[] = [];

  const serviceNode: PlanServiceNode = {
    bindings: serviceNodeBindings,
    isContextFree: true,
    serviceIdentifier,
  };

  serviceNodeBindings.push(
    ...buildServiceNodeBindings(
      params,
      updatedBindingConstraintsList,
      filteredServiceBindings,
      serviceNode,
      chained,
    ),
  );

  serviceNode.isContextFree =
    !updatedBindingConstraintsList.last.elem.getAncestorsCalled;

  if (elementMetadata.kind === ClassElementMetadataKind.singleInjection) {
    checkServiceNodeSingleInjectionBindings(
      serviceNode,
      elementMetadata.optional,
      updatedBindingConstraintsList.last,
    );

    const [planBindingNode]: PlanBindingNode[] = serviceNodeBindings;

    (serviceNode as Writable<PlanServiceNode>).bindings = planBindingNode;
  }

  return serviceNode;
}

function buildPlanServiceNodeFromResolvedValueElementMetadata(
  params: SubplanParams,
  bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>,
  elementMetadata: ResolvedValueElementMetadata,
): PlanServiceNode {
  const serviceIdentifier: ServiceIdentifier =
    getServiceFromMaybeLazyServiceIdentifier(elementMetadata.value);

  const updatedBindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints> =
    bindingConstraintsList.concat({
      getAncestorsCalled: false,
      name: elementMetadata.name,
      serviceIdentifier,
      tags: elementMetadata.tags,
    });

  const bindingConstraints: BindingConstraints =
    new BindingConstraintsImplementation(updatedBindingConstraintsList.last);

  const chained: boolean =
    elementMetadata.kind === ResolvedValueElementMetadataKind.multipleInjection
      ? elementMetadata.chained
      : false;

  const filteredServiceBindings: Binding<unknown>[] =
    buildFilteredServiceBindings(params, bindingConstraints, {
      chained,
    });

  const serviceNodeBindings: PlanBindingNode[] = [];

  const serviceNode: PlanServiceNode = {
    bindings: serviceNodeBindings,
    isContextFree: true,
    serviceIdentifier,
  };

  serviceNodeBindings.push(
    ...buildServiceNodeBindings(
      params,
      updatedBindingConstraintsList,
      filteredServiceBindings,
      serviceNode,
      chained,
    ),
  );

  serviceNode.isContextFree =
    !updatedBindingConstraintsList.last.elem.getAncestorsCalled;

  if (
    elementMetadata.kind === ResolvedValueElementMetadataKind.singleInjection
  ) {
    checkServiceNodeSingleInjectionBindings(
      serviceNode,
      elementMetadata.optional,
      updatedBindingConstraintsList.last,
    );

    const [planBindingNode]: PlanBindingNode[] = serviceNodeBindings;

    (serviceNode as Writable<PlanServiceNode>).bindings = planBindingNode;
  }

  return serviceNode;
}

function buildResolvedValuePlanBindingNode(
  params: BasePlanParams,
  binding: ResolvedValueBinding<unknown>,
  bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>,
): PlanBindingNode {
  const childNode: ResolvedValueBindingNode = {
    binding: binding,
    params: [],
  };

  const subplanParams: SubplanParams = {
    autobindOptions: params.autobindOptions,
    node: childNode,
    operations: params.operations,
    servicesBranch: params.servicesBranch,
  };

  return subplan(subplanParams, bindingConstraintsList);
}

function buildServiceNodeBindings(
  params: BasePlanParams,
  bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>,
  serviceBindings: Binding<unknown>[],
  parentNode: BindingNodeParent,
  chainedBindings: boolean,
): PlanBindingNode[] {
  const serviceIdentifier: ServiceIdentifier =
    isPlanServiceRedirectionBindingNode(parentNode)
      ? parentNode.binding.targetServiceIdentifier
      : parentNode.serviceIdentifier;

  params.servicesBranch.push(serviceIdentifier);

  const planBindingNodes: PlanBindingNode[] = [];

  for (const binding of serviceBindings) {
    switch (binding.type) {
      case bindingTypeValues.Instance: {
        planBindingNodes.push(
          buildInstancePlanBindingNode(params, binding, bindingConstraintsList),
        );
        break;
      }
      case bindingTypeValues.ResolvedValue: {
        planBindingNodes.push(
          buildResolvedValuePlanBindingNode(
            params,
            binding,
            bindingConstraintsList,
          ),
        );
        break;
      }
      case bindingTypeValues.ServiceRedirection: {
        const planBindingNode: PlanBindingNode | undefined =
          buildServiceRedirectionPlanBindingNode(
            params,
            bindingConstraintsList,
            binding,
            chainedBindings,
          );

        planBindingNodes.push(planBindingNode);

        break;
      }
      default:
        planBindingNodes.push({
          binding: binding,
        });
    }
  }

  params.servicesBranch.pop();

  return planBindingNodes;
}

function buildServiceRedirectionPlanBindingNode(
  params: BasePlanParams,
  bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>,
  binding: ServiceRedirectionBinding<unknown>,
  chainedBindings: boolean,
): PlanBindingNode {
  const childNode: PlanServiceRedirectionBindingNode = {
    binding,
    redirections: [],
  };

  const bindingConstraints: BindingConstraints =
    new BindingConstraintsImplementation(bindingConstraintsList.last);

  const filteredServiceBindings: Binding<unknown>[] =
    buildFilteredServiceBindings(params, bindingConstraints, {
      chained: chainedBindings,
      customServiceIdentifier: binding.targetServiceIdentifier,
    });

  childNode.redirections.push(
    ...buildServiceNodeBindings(
      params,
      bindingConstraintsList,
      filteredServiceBindings,
      childNode,
      chainedBindings,
    ),
  );

  return childNode;
}

function handlePlanServiceNodeBuildFromClassElementMetadata(
  params: SubplanParams,
  bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>,
  elementMetadata: ClassElementMetadata,
): PlanServiceNode | undefined {
  if (elementMetadata.kind === ClassElementMetadataKind.unmanaged) {
    return undefined;
  }

  const getPlanOptions: GetPlanOptions | undefined =
    tryBuildGetPlanOptionsFromManagedClassElementMetadata(elementMetadata);

  if (getPlanOptions !== undefined) {
    const planResult: PlanResult | undefined =
      params.operations.getPlan(getPlanOptions);

    if (planResult !== undefined && planResult.tree.root.isContextFree) {
      return planResult.tree.root;
    }
  }

  const serviceNode: PlanServiceNode =
    buildPlanServiceNodeFromClassElementMetadata(
      params,
      bindingConstraintsList,
      elementMetadata,
    );

  const lazyPlanServiceNode: LazyPlanServiceNode =
    new LazyManagedClassMetadataPlanServiceNode(
      params,
      bindingConstraintsList,
      elementMetadata,
      serviceNode,
    );

  cacheNonRootPlanServiceNode(
    getPlanOptions,
    params.operations,
    lazyPlanServiceNode,
  );

  return lazyPlanServiceNode;
}

function handlePlanServiceNodeBuildFromResolvedValueElementMetadata(
  params: SubplanParams,
  bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>,
  elementMetadata: ResolvedValueElementMetadata,
): PlanServiceNode {
  const getPlanOptions: GetPlanOptions | undefined =
    tryBuildGetPlanOptionsFromResolvedValueElementMetadata(elementMetadata);

  if (getPlanOptions !== undefined) {
    const planResult: PlanResult | undefined =
      params.operations.getPlan(getPlanOptions);

    if (planResult !== undefined && planResult.tree.root.isContextFree) {
      return planResult.tree.root;
    }
  }

  const serviceNode: PlanServiceNode =
    buildPlanServiceNodeFromResolvedValueElementMetadata(
      params,
      bindingConstraintsList,
      elementMetadata,
    );

  const lazyPlanServiceNode: LazyPlanServiceNode =
    new LazyResolvedValueMetadataPlanServiceNode(
      params,
      bindingConstraintsList,
      elementMetadata,
      serviceNode,
    );

  cacheNonRootPlanServiceNode(
    getPlanOptions,
    params.operations,
    lazyPlanServiceNode,
  );

  return lazyPlanServiceNode;
}

function subplan(
  params: SubplanParams,
  bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>,
): PlanBindingNode {
  if (isInstanceBindingNode(params.node)) {
    return subplanInstanceBindingNode(
      params,
      params.node,
      bindingConstraintsList,
    );
  } else {
    return subplanResolvedValueBindingNode(
      params,
      params.node,
      bindingConstraintsList,
    );
  }
}

function subplanInstanceBindingNode(
  params: SubplanParams,
  node: InstanceBindingNode,
  bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>,
): PlanBindingNode {
  const classMetadata: ClassMetadata = node.classMetadata;

  for (const [
    index,
    elementMetadata,
  ] of classMetadata.constructorArguments.entries()) {
    node.constructorParams[index] =
      handlePlanServiceNodeBuildFromClassElementMetadata(
        params,
        bindingConstraintsList,
        elementMetadata,
      );
  }

  for (const [propertyKey, elementMetadata] of classMetadata.properties) {
    const planServiceNode: PlanServiceNode | undefined =
      handlePlanServiceNodeBuildFromClassElementMetadata(
        params,
        bindingConstraintsList,
        elementMetadata,
      );

    if (planServiceNode !== undefined) {
      node.propertyParams.set(propertyKey, planServiceNode);
    }
  }

  return params.node;
}

function subplanResolvedValueBindingNode(
  params: SubplanParams,
  node: ResolvedValueBindingNode,
  bindingConstraintsList: SingleInmutableLinkedList<InternalBindingConstraints>,
): PlanBindingNode {
  const resolvedValueMetadata: ResolvedValueMetadata = node.binding.metadata;

  for (const [
    index,
    elementMetadata,
  ] of resolvedValueMetadata.arguments.entries()) {
    node.params[index] =
      handlePlanServiceNodeBuildFromResolvedValueElementMetadata(
        params,
        bindingConstraintsList,
        elementMetadata,
      );
  }

  return params.node;
}
