import { LazyServiceIdentifier, ServiceIdentifier } from '@inversifyjs/common';

import { decrementPendingClassMetadataCount } from '../actions/decrementPendingClassMetadataCount';
import { buildManagedMetadataFromMaybeClassElementMetadata } from '../calculations/buildManagedMetadataFromMaybeClassElementMetadata';
import { ClassElementMetadata } from '../models/ClassElementMetadata';
import { ClassElementMetadataKind } from '../models/ClassElementMetadataKind';
import { MaybeClassElementMetadata } from '../models/MaybeClassElementMetadata';
import { MultiInjectOptions } from '../models/MultiInjectOptions';
import { injectBase } from './injectBase';

export function multiInject(
  serviceIdentifier: ServiceIdentifier | LazyServiceIdentifier,
  options?: MultiInjectOptions,
): MethodDecorator & ParameterDecorator & PropertyDecorator {
  const updateMetadata: (
    classElementMetadata: MaybeClassElementMetadata | undefined,
  ) => ClassElementMetadata = buildManagedMetadataFromMaybeClassElementMetadata(
    ClassElementMetadataKind.multipleInjection,
    serviceIdentifier,
    options,
  );

  return injectBase(updateMetadata, decrementPendingClassMetadataCount);
}
