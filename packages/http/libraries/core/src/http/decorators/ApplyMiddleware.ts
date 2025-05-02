import {
  getReflectMetadata,
  getReflectMetadataWithProperty,
  setReflectMetadata,
  setReflectMetadataWithProperty,
} from '@inversifyjs/reflect-metadata-utils';
import { Newable } from 'inversify';

import { controllerMethodMiddlewareMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodMiddlewareMetadataReflectKey';
import { controllerMiddlewareMetadataReflectKey } from '../../reflectMetadata/data/controllerMiddlewareMetadataReflectKey';
import { Middleware } from '../middleware/model/Middleware';
import { ApplyMiddlewareOptions } from '../models/ApplyMiddlewareOptions';

export function applyMiddleware(
  ...middlewareList: (Newable<Middleware> | ApplyMiddlewareOptions)[]
): ClassDecorator & MethodDecorator {
  return (target: object, key?: string | symbol): void => {
    let middlewareMetadataList:
      | (NewableFunction | ApplyMiddlewareOptions)[]
      | undefined = undefined;

    if (key === undefined) {
      middlewareMetadataList = getReflectMetadata(
        target,
        controllerMiddlewareMetadataReflectKey,
      );
    } else {
      middlewareMetadataList = getReflectMetadataWithProperty(
        target,
        controllerMethodMiddlewareMetadataReflectKey,
        key,
      );
    }

    if (middlewareMetadataList !== undefined) {
      middlewareMetadataList.push(...middlewareList);
    } else {
      middlewareMetadataList = middlewareList;
    }

    if (key === undefined) {
      setReflectMetadata(
        target,
        controllerMiddlewareMetadataReflectKey,
        middlewareMetadataList,
      );
    } else {
      setReflectMetadataWithProperty(
        target,
        controllerMethodMiddlewareMetadataReflectKey,
        key,
        middlewareMetadataList,
      );
    }
  };
}
