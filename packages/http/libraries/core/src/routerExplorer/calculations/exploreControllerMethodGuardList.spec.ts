import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

vitest.mock('@inversifyjs/reflect-metadata-utils');

import { getReflectMetadataWithProperty } from '@inversifyjs/reflect-metadata-utils';

import { controllerMethodGuardMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodGuardMetadataReflectKey';
import { exploreControllerMethodGuardList } from './exploreControllerMethodGuardList';

describe(exploreControllerMethodGuardList.name, () => {
  describe('when called and getReflectMetadata returns undefined', () => {
    let controllerFixture: NewableFunction;
    let controllerMethodKeyFixture: string | symbol;
    let result: unknown;

    beforeAll(() => {
      controllerFixture = class Test {};
      controllerMethodKeyFixture = 'testMethod';

      result = exploreControllerMethodGuardList(
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
        controllerMethodGuardMetadataReflectKey,
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
    let controllerMethodGuardFixtures: NewableFunction[];
    let result: unknown;

    beforeAll(() => {
      controllerFixture = class Test {};
      controllerMethodKeyFixture = 'testMethod';
      controllerMethodGuardFixtures = [];

      vitest
        .mocked(getReflectMetadataWithProperty)
        .mockReturnValueOnce(controllerMethodGuardFixtures);

      result = exploreControllerMethodGuardList(
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
        controllerMethodGuardMetadataReflectKey,
        controllerMethodKeyFixture,
      );
    });

    it('should return an array', () => {
      expect(result).toBe(controllerMethodGuardFixtures);
    });
  });
});
