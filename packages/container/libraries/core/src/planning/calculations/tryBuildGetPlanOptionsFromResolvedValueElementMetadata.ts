import { LazyServiceIdentifier, ServiceIdentifier } from '@inversifyjs/common';

import { MetadataTag } from '../../metadata/models/MetadataTag';
import { ResolvedValueElementMetadata } from '../../metadata/models/ResolvedValueElementMetadata';
import { ResolvedValueElementMetadataKind } from '../../metadata/models/ResolvedValueElementMetadataKind';
import { GetPlanOptions } from '../models/GetPlanOptions';
import { GetPlanOptionsTagConstraint } from '../models/GetPlanOptionsTagConstraint';

export function tryBuildGetPlanOptionsFromResolvedValueElementMetadata(
  resolvedValueElementMetadata: ResolvedValueElementMetadata,
): GetPlanOptions | undefined {
  let tag: GetPlanOptionsTagConstraint | undefined;

  if (resolvedValueElementMetadata.tags.size === 0) {
    tag = undefined;
  } else if (resolvedValueElementMetadata.tags.size === 1) {
    const [key, value]: [MetadataTag, unknown] =
      resolvedValueElementMetadata.tags.entries().next().value as [
        MetadataTag,
        unknown,
      ];
    tag = { key, value };
  } else {
    return undefined;
  }

  const serviceIdentifier: ServiceIdentifier = LazyServiceIdentifier.is(
    resolvedValueElementMetadata.value,
  )
    ? resolvedValueElementMetadata.value.unwrap()
    : resolvedValueElementMetadata.value;

  if (
    resolvedValueElementMetadata.kind ===
    ResolvedValueElementMetadataKind.multipleInjection
  ) {
    return {
      chained: resolvedValueElementMetadata.chained,
      isMultiple: true,
      name: resolvedValueElementMetadata.name,
      optional: resolvedValueElementMetadata.optional,
      serviceIdentifier,
      tag,
    };
  } else {
    return {
      isMultiple: false,
      name: resolvedValueElementMetadata.name,
      optional: resolvedValueElementMetadata.optional,
      serviceIdentifier,
      tag,
    };
  }
}
