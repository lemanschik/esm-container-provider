import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

vitest.mock('@inversifyjs/reflect-metadata-utils');

import { getReflectMetadataWithProperty } from '@inversifyjs/reflect-metadata-utils';

import { controllerMethodStatusCodeMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodStatusCodeMetadataReflectKey';
import { exploreControllerMethodStatusCodeMetadata } from './exploreControllerMethodStatusCodeMetadata';

describe(exploreControllerMethodStatusCodeMetadata.name, () => {
  describe('when called', () => {
    let controllerFixture: NewableFunction;
    let controllerMethodKeyFixture: string | symbol;
    let statusCodeMetadataFixture: undefined;
    let result: unknown;

    beforeAll(() => {
      controllerFixture = class Test {};
      controllerMethodKeyFixture = 'testMethod';
      statusCodeMetadataFixture = undefined;

      result = exploreControllerMethodStatusCodeMetadata(
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
        controllerMethodStatusCodeMetadataReflectKey,
        controllerMethodKeyFixture,
      );
    });

    it('should return the controller metadata', () => {
      expect(result).toBe(statusCodeMetadataFixture);
    });
  });
});
