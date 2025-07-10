import { LazyServiceIdentifier, ServiceIdentifier } from '@inversifyjs/common';

import { ClassElementMetadataKind } from '../models/ClassElementMetadataKind';
import { ManagedClassElementMetadata } from '../models/ManagedClassElementMetadata';
import { MultiInjectOptions } from '../models/MultiInjectOptions';

export function buildDefaultManagedMetadata(
  kind: ClassElementMetadataKind.singleInjection,
  serviceIdentifier: ServiceIdentifier | LazyServiceIdentifier,
): ManagedClassElementMetadata;
export function buildDefaultManagedMetadata(
  kind: ClassElementMetadataKind.multipleInjection,
  serviceIdentifier: ServiceIdentifier | LazyServiceIdentifier,
  options: MultiInjectOptions | undefined,
): ManagedClassElementMetadata;
export function buildDefaultManagedMetadata(
  kind:
    | ClassElementMetadataKind.singleInjection
    | ClassElementMetadataKind.multipleInjection,
  serviceIdentifier: ServiceIdentifier | LazyServiceIdentifier,
  options?: MultiInjectOptions,
): ManagedClassElementMetadata {
  const baseMetadata: Omit<ManagedClassElementMetadata, 'chained'> = {
    kind,
    name: undefined,
    optional: false,
    tags: new Map(),
    value: serviceIdentifier,
  };

  // Only add chained property for multiple injection
  if (
    kind === ClassElementMetadataKind.multipleInjection &&
    options?.chained !== undefined
  ) {
    return {
      ...baseMetadata,
      chained: options.chained,
    } as ManagedClassElementMetadata;
  }

  return baseMetadata as ManagedClassElementMetadata;
}
