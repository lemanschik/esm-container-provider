import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

vitest.mock('@inversifyjs/reflect-metadata-utils');

import { getReflectMetadataWithProperty } from '@inversifyjs/reflect-metadata-utils';

import { controllerMethodMiddlewareMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodMiddlewareMetadataReflectKey';
import { exploreControllerMethodMiddlewareList } from './exploreControllerMethodMiddlewareList';

describe(exploreControllerMethodMiddlewareList.name, () => {
  describe('when called and getReflectMetadata returns undefined', () => {
    let controllerFixture: NewableFunction;
    let controllerMethodKeyFixture: string | symbol;
    let result: unknown;

    beforeAll(() => {
      controllerFixture = class Test {};
      controllerMethodKeyFixture = 'testMethod';

      result = exploreControllerMethodMiddlewareList(
        controllerFixture,
        controllerMethodKeyFixture,
      );
    });

    afterAll(() => {
      vitest.clearAllMocks();
    });

    it('should call getReflectMetadata', () => {
      expect(getReflectMetadataWithProperty).toHaveBeenCalledTimes(1);
      expect(getReflectMetadataWithProperty).toHaveBeenCalledWith(
        controllerFixture.prototype,
        controllerMethodMiddlewareMetadataReflectKey,
        controllerMethodKeyFixture,
      );
    });

    it('should return an empty array', () => {
      expect(result).toStrictEqual([]);
    });
  });

  describe('when called and getReflectMetadata returns an array', () => {
    let controllerFixture: NewableFunction;
    let controllerMethodKeyFixture: string | symbol;
    let middlewareFixtures: NewableFunction[];
    let result: unknown;

    beforeAll(() => {
      controllerFixture = class Test {};
      controllerMethodKeyFixture = 'testMethod';
      middlewareFixtures = [];

      vitest
        .mocked(getReflectMetadataWithProperty)
        .mockReturnValueOnce(middlewareFixtures);

      result = exploreControllerMethodMiddlewareList(
        controllerFixture,
        controllerMethodKeyFixture,
      );
    });

    afterAll(() => {
      vitest.clearAllMocks();
    });

    it('should call getReflectMetadata', () => {
      expect(getReflectMetadataWithProperty).toHaveBeenCalledTimes(1);
      expect(getReflectMetadataWithProperty).toHaveBeenCalledWith(
        controllerFixture.prototype,
        controllerMethodMiddlewareMetadataReflectKey,
        controllerMethodKeyFixture,
      );
    });

    it('should return an array', () => {
      expect(result).toBe(middlewareFixtures);
    });
  });
});
