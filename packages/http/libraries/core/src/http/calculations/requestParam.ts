import {
  getReflectMetadataWithProperty,
  setReflectMetadataWithProperty,
} from '@inversifyjs/reflect-metadata-utils';

import { InversifyHttpAdapterError } from '../../error/models/InversifyHttpAdapterError';
import { InversifyHttpAdapterErrorKind } from '../../error/models/InversifyHttpAdapterErrorKind';
import { controllerMethodParameterMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodParameterMetadataReflectKey';
import { controllerMethodUseNativeHandlerMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodUseNativeHandlerMetadataReflectKey';
import { ControllerMethodParameterMetadata } from '../../routerExplorer/model/ControllerMethodParameterMetadata';
import { RequestMethodParameterType } from '../models/RequestMethodParameterType';

export function requestParam(
  controllerMethodParameterMetadata: ControllerMethodParameterMetadata,
): ParameterDecorator {
  return (
    target: object,
    key: string | symbol | undefined,
    index: number,
  ): void => {
    if (key === undefined) {
      throw new InversifyHttpAdapterError(
        InversifyHttpAdapterErrorKind.requestParamIncorrectUse,
      );
    }

    let parameterMetadataList:
      | (ControllerMethodParameterMetadata | undefined)[]
      | undefined = getReflectMetadataWithProperty(
      target,
      controllerMethodParameterMetadataReflectKey,
      key,
    );

    if (parameterMetadataList === undefined) {
      parameterMetadataList = [];
    }

    parameterMetadataList[index] = controllerMethodParameterMetadata;

    setReflectMetadataWithProperty(
      target,
      controllerMethodParameterMetadataReflectKey,
      key,
      parameterMetadataList,
    );

    if (
      controllerMethodParameterMetadata.parameterType ===
        RequestMethodParameterType.NEXT ||
      controllerMethodParameterMetadata.parameterType ===
        RequestMethodParameterType.RESPONSE
    ) {
      setReflectMetadataWithProperty(
        target,
        controllerMethodUseNativeHandlerMetadataReflectKey,
        key,
        true,
      );
    }
  };
}
