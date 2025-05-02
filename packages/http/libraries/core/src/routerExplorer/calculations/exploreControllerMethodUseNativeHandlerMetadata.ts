import { getReflectMetadataWithProperty } from '@inversifyjs/reflect-metadata-utils';

import { controllerMethodUseNativeHandlerMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodUseNativeHandlerMetadataReflectKey';

export function exploreControllerMethodUseNativeHandlerMetadata(
  controller: NewableFunction,
  methodKey: string | symbol,
): boolean {
  return (
    getReflectMetadataWithProperty(
      controller.prototype as object,
      controllerMethodUseNativeHandlerMetadataReflectKey,
      methodKey,
    ) ?? false
  );
}
