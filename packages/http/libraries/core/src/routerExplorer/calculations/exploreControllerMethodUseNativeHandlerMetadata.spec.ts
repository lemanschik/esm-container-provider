import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

vitest.mock('@inversifyjs/reflect-metadata-utils');

import { getReflectMetadataWithProperty } from '@inversifyjs/reflect-metadata-utils';

import { controllerMethodUseNativeHandlerMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodUseNativeHandlerMetadataReflectKey';
import { exploreControllerMethodUseNativeHandlerMetadata } from './exploreControllerMethodUseNativeHandlerMetadata';

describe(exploreControllerMethodUseNativeHandlerMetadata.name, () => {
  describe('when called and getReflectMetadata returns undefined', () => {
    let controllerFixture: NewableFunction;
    let controllerMethodKeyFixture: string | symbol;
    let result: unknown;

    beforeAll(() => {
      controllerFixture = class Test {};
      controllerMethodKeyFixture = 'testMethod';

      result = exploreControllerMethodUseNativeHandlerMetadata(
        controllerFixture,
        controllerMethodKeyFixture,
      );
    });

    afterAll(() => {
      vitest.clearAllMocks();
    });

    it('should call getReflectMetadataWithProperty', () => {
      expect(getReflectMetadataWithProperty).toHaveBeenCalledTimes(1);
      expect(getReflectMetadataWithProperty).toHaveBeenCalledWith(
        controllerFixture.prototype,
        controllerMethodUseNativeHandlerMetadataReflectKey,
        controllerMethodKeyFixture,
      );
    });

    it('should return false', () => {
      expect(result).toBe(false);
    });
  });

  describe('when called and getReflectMetadata returns a boolean', () => {
    let controllerFixture: NewableFunction;
    let controllerMethodKeyFixture: string | symbol;
    let useNativeHandlerFixture: boolean;
    let result: unknown;

    beforeAll(() => {
      controllerFixture = class Test {};
      controllerMethodKeyFixture = 'testMethod';
      useNativeHandlerFixture = false;

      vitest
        .mocked(getReflectMetadataWithProperty)
        .mockReturnValueOnce(useNativeHandlerFixture);

      result = exploreControllerMethodUseNativeHandlerMetadata(
        controllerFixture,
        controllerMethodKeyFixture,
      );
    });

    afterAll(() => {
      vitest.clearAllMocks();
    });

    it('should call getReflectMetadataWithProperty', () => {
      expect(getReflectMetadataWithProperty).toHaveBeenCalledTimes(1);
      expect(getReflectMetadataWithProperty).toHaveBeenCalledWith(
        controllerFixture.prototype,
        controllerMethodUseNativeHandlerMetadataReflectKey,
        controllerMethodKeyFixture,
      );
    });

    it('should return a boolean', () => {
      expect(result).toBe(useNativeHandlerFixture);
    });
  });
});
