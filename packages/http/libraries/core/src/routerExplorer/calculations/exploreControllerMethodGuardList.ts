import { getReflectMetadataWithProperty } from '@inversifyjs/reflect-metadata-utils';

import { controllerMethodGuardMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodGuardMetadataReflectKey';

export function exploreControllerMethodGuardList(
  controller: NewableFunction,
  methodKey: string | symbol,
): NewableFunction[] {
  return (
    getReflectMetadataWithProperty(
      controller.prototype as object,
      controllerMethodGuardMetadataReflectKey,
      methodKey,
    ) ?? []
  );
}
