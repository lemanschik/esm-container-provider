import { LazyServiceIdentifier, ServiceIdentifier } from '@inversifyjs/common';

import { ClassElementMetadata } from '../models/ClassElementMetadata';
import { ClassElementMetadataKind } from '../models/ClassElementMetadataKind';
import { MaybeClassElementMetadata } from '../models/MaybeClassElementMetadata';
import { MultiInjectOptions } from '../models/MultiInjectOptions';
import { buildClassElementMetadataFromMaybeClassElementMetadata } from './buildClassElementMetadataFromMaybeClassElementMetadata';
import { buildDefaultManagedMetadata } from './buildDefaultManagedMetadata';
import { buildManagedMetadataFromMaybeManagedMetadata } from './buildManagedMetadataFromMaybeManagedMetadata';

export const buildManagedMetadataFromMaybeClassElementMetadata: ((
  kind: ClassElementMetadataKind.singleInjection,
  serviceIdentifier: ServiceIdentifier | LazyServiceIdentifier,
) => (
  metadata: MaybeClassElementMetadata | undefined,
) => ClassElementMetadata) &
  ((
    kind: ClassElementMetadataKind.multipleInjection,
    serviceIdentifier: ServiceIdentifier | LazyServiceIdentifier,
    options: MultiInjectOptions | undefined,
  ) => (
    metadata: MaybeClassElementMetadata | undefined,
  ) => ClassElementMetadata) =
  buildClassElementMetadataFromMaybeClassElementMetadata<
    [
      [
        ClassElementMetadataKind.singleInjection,
        ServiceIdentifier | LazyServiceIdentifier,
      ],
      [
        ClassElementMetadataKind.multipleInjection,
        ServiceIdentifier | LazyServiceIdentifier,
        MultiInjectOptions | undefined,
      ],
    ]
  >(buildDefaultManagedMetadata, buildManagedMetadataFromMaybeManagedMetadata);
