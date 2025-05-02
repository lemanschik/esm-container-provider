import { getReflectMetadataWithProperty } from '@inversifyjs/reflect-metadata-utils';

import { ApplyMiddlewareOptions } from '../../http/models/ApplyMiddlewareOptions';
import { controllerMethodMiddlewareMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodMiddlewareMetadataReflectKey';

export function exploreControllerMethodMiddlewareList(
  controller: NewableFunction,
  methodKey: string | symbol,
): (NewableFunction | ApplyMiddlewareOptions)[] {
  return (
    getReflectMetadataWithProperty(
      controller.prototype as object,
      controllerMethodMiddlewareMetadataReflectKey,
      methodKey,
    ) ?? []
  );
}
