import { LazyServiceIdentifier, ServiceIdentifier } from '@inversifyjs/common';

import { ClassElementMetadataKind } from '../models/ClassElementMetadataKind';
import { ManagedClassElementMetadata } from '../models/ManagedClassElementMetadata';
import { MaybeManagedClassElementMetadata } from '../models/MaybeManagedClassElementMetadata';
import { MultiInjectOptions } from '../models/MultiInjectOptions';
import { assertMetadataFromTypescriptIfManaged } from './assertMetadataFromTypescriptIfManaged';

export function buildManagedMetadataFromMaybeManagedMetadata(
  metadata: MaybeManagedClassElementMetadata | ManagedClassElementMetadata,
  kind: ClassElementMetadataKind.singleInjection,
  serviceIdentifier: ServiceIdentifier | LazyServiceIdentifier,
): ManagedClassElementMetadata;
export function buildManagedMetadataFromMaybeManagedMetadata(
  metadata: MaybeManagedClassElementMetadata | ManagedClassElementMetadata,
  kind: ClassElementMetadataKind.multipleInjection,
  serviceIdentifier: ServiceIdentifier | LazyServiceIdentifier,
  options: MultiInjectOptions | undefined,
): ManagedClassElementMetadata;
export function buildManagedMetadataFromMaybeManagedMetadata(
  metadata: MaybeManagedClassElementMetadata | ManagedClassElementMetadata,
  kind:
    | ClassElementMetadataKind.singleInjection
    | ClassElementMetadataKind.multipleInjection,
  serviceIdentifier: ServiceIdentifier | LazyServiceIdentifier,
  options?: MultiInjectOptions,
): ManagedClassElementMetadata {
  assertMetadataFromTypescriptIfManaged(metadata);

  if (kind === ClassElementMetadataKind.multipleInjection) {
    return {
      ...metadata,
      chained: options?.chained ?? false,
      kind,
      value: serviceIdentifier,
    };
  } else {
    return {
      ...metadata,
      kind,
      value: serviceIdentifier,
    };
  }
}
