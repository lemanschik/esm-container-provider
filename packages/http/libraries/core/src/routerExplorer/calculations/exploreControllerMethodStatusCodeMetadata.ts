import { getReflectMetadataWithProperty } from '@inversifyjs/reflect-metadata-utils';

import { HttpStatusCode } from '../../http/responses/HttpStatusCode';
import { controllerMethodStatusCodeMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodStatusCodeMetadataReflectKey';

export function exploreControllerMethodStatusCodeMetadata(
  controller: NewableFunction,
  methodKey: string | symbol,
): HttpStatusCode | undefined {
  return getReflectMetadataWithProperty(
    controller.prototype as object,
    controllerMethodStatusCodeMetadataReflectKey,
    methodKey,
  );
}
