import { getReflectMetadataWithProperty } from '@inversifyjs/reflect-metadata-utils';

import { controllerMethodParameterMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodParameterMetadataReflectKey';
import { ControllerMethodParameterMetadata } from '../model/ControllerMethodParameterMetadata';

export function exploreControllerMethodParameterMetadataList(
  controller: NewableFunction,
  methodKey: string | symbol,
): (ControllerMethodParameterMetadata | undefined)[] {
  return (
    getReflectMetadataWithProperty(
      controller.prototype as object,
      controllerMethodParameterMetadataReflectKey,
      methodKey,
    ) ?? []
  );
}
