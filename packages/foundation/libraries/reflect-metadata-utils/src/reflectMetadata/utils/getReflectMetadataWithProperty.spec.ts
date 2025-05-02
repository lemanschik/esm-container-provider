import { beforeAll, describe, expect, it } from 'vitest';

import 'reflect-metadata';

import { getReflectMetadataWithProperty } from './getReflectMetadataWithProperty';

describe(getReflectMetadataWithProperty.name, () => {
  describe('when called, and no metadata is registered', () => {
    let result: unknown;

    beforeAll(() => {
      result = getReflectMetadataWithProperty(
        class {},
        'sample-key',
        'sample-property',
      );
    });

    it('should return undefined', () => {
      expect(result).toBeUndefined();
    });
  });

  describe('when called, and metadata is registered', () => {
    let result: unknown;

    let metadataFixture: unknown;

    beforeAll(() => {
      metadataFixture = 'sample-metadata';

      // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      const targetFixture: Function = class {};
      const metadataKeyFixture: unknown = 'sample-key';
      const propertyKeyFixture: string = 'sample-property';

      Reflect.defineMetadata(
        metadataKeyFixture,
        metadataFixture,
        targetFixture,
        propertyKeyFixture,
      );

      result = getReflectMetadataWithProperty(
        targetFixture,
        metadataKeyFixture,
        propertyKeyFixture,
      );
    });

    it('should return metadata', () => {
      expect(result).toBe(metadataFixture);
    });
  });
});
