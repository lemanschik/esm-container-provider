import { LazyServiceIdentifier, ServiceIdentifier } from '@inversifyjs/common';

import { ClassElementMetadataKind } from '../../metadata/models/ClassElementMetadataKind';
import { ManagedClassElementMetadata } from '../../metadata/models/ManagedClassElementMetadata';
import { MetadataTag } from '../../metadata/models/MetadataTag';
import { GetPlanOptions } from '../models/GetPlanOptions';
import { GetPlanOptionsTagConstraint } from '../models/GetPlanOptionsTagConstraint';

export function tryBuildGetPlanOptionsFromManagedClassElementMetadata(
  elementMetadata: ManagedClassElementMetadata,
): GetPlanOptions | undefined {
  let tag: GetPlanOptionsTagConstraint | undefined;

  if (elementMetadata.tags.size === 0) {
    tag = undefined;
  } else if (elementMetadata.tags.size === 1) {
    const [key, value]: [MetadataTag, unknown] = elementMetadata.tags
      .entries()
      .next().value as [MetadataTag, unknown];
    tag = { key, value };
  } else {
    return undefined;
  }

  const serviceIdentifier: ServiceIdentifier = LazyServiceIdentifier.is(
    elementMetadata.value,
  )
    ? elementMetadata.value.unwrap()
    : elementMetadata.value;

  if (elementMetadata.kind === ClassElementMetadataKind.multipleInjection) {
    return {
      chained: elementMetadata.chained,
      isMultiple: true,
      name: elementMetadata.name,
      optional: elementMetadata.optional,
      serviceIdentifier,
      tag,
    };
  } else {
    return {
      isMultiple: false,
      name: elementMetadata.name,
      optional: elementMetadata.optional,
      serviceIdentifier,
      tag,
    };
  }
}
