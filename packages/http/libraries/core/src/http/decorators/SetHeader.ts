import {
  getReflectMetadataWithProperty,
  setReflectMetadataWithProperty,
} from '@inversifyjs/reflect-metadata-utils';

import { controllerMethodHeaderMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodHeaderMetadataReflectKey';

export function setHeader(headerKey: string, value: string): MethodDecorator {
  return (target: object, key: string | symbol): void => {
    const headerMetadata: Map<string, string> =
      getReflectMetadataWithProperty(
        target,
        controllerMethodHeaderMetadataReflectKey,
        key,
      ) ?? new Map<string, string>();

    const fixedKey: string = headerKey.toLowerCase();

    const headerValue: string | undefined = headerMetadata.get(fixedKey);

    if (headerValue !== undefined) {
      headerMetadata.set(fixedKey, `${headerValue}, ${value}`);
    } else {
      headerMetadata.set(fixedKey, value);
    }

    setReflectMetadataWithProperty(
      target,
      controllerMethodHeaderMetadataReflectKey,
      key,
      headerMetadata,
    );
  };
}
