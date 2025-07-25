import { setReflectMetadata } from '@inversifyjs/reflect-metadata-utils';

import { controllerMethodStatusCodeMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodStatusCodeMetadataReflectKey';
import { HttpStatusCode } from '../responses/HttpStatusCode';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function StatusCode(StatusCode: HttpStatusCode): MethodDecorator {
  return (target: object, key: string | symbol): void => {
    setReflectMetadata(
      target.constructor,
      controllerMethodStatusCodeMetadataReflectKey,
      StatusCode,
      key,
    );
  };
}
