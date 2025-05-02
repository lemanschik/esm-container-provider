import {
  getReflectMetadata,
  getReflectMetadataWithProperty,
  setReflectMetadata,
  setReflectMetadataWithProperty,
} from '@inversifyjs/reflect-metadata-utils';
import { Newable } from 'inversify';

import { controllerGuardMetadataReflectKey } from '../../reflectMetadata/data/controllerGuardMetadataReflectKey';
import { controllerMethodGuardMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodGuardMetadataReflectKey';
import { Guard } from '../guard/model/Guard';

export function useGuard(
  ...guardList: Newable<Guard>[]
): ClassDecorator & MethodDecorator {
  return (target: object, key?: string | symbol): void => {
    let guardMetadataList: NewableFunction[] | undefined = undefined;

    if (key === undefined) {
      guardMetadataList = getReflectMetadata(
        target,
        controllerGuardMetadataReflectKey,
      );
    } else {
      guardMetadataList = getReflectMetadataWithProperty(
        target,
        controllerMethodGuardMetadataReflectKey,
        key,
      );
    }

    if (guardMetadataList !== undefined) {
      guardMetadataList.push(...guardList);
    } else {
      guardMetadataList = guardList;
    }

    if (key === undefined) {
      setReflectMetadata(
        target,
        controllerGuardMetadataReflectKey,
        guardMetadataList,
      );
    } else {
      setReflectMetadataWithProperty(
        target,
        controllerMethodGuardMetadataReflectKey,
        key,
        guardMetadataList,
      );
    }
  };
}
