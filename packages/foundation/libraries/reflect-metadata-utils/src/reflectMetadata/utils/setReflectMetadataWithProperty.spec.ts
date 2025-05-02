import { beforeAll, describe, expect, it } from 'vitest';

import 'reflect-metadata';

import { setReflectMetadataWithProperty } from './setReflectMetadataWithProperty';

describe(setReflectMetadataWithProperty.name, () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  let targetFixture: Function;
  let metadataKeyFixture: unknown;
  let metadataFixture: unknown;
  let propertyKeyFixture: string;

  beforeAll(() => {
    targetFixture = class {};
    metadataKeyFixture = 'sample-key';
    metadataFixture = 'metadata';
    propertyKeyFixture = 'sample-property';
  });

  describe('when called', () => {
    let reflectMetadata: unknown;
    let result: unknown;

    beforeAll(() => {
      metadataFixture = 'metadata';
      result = setReflectMetadataWithProperty(
        targetFixture,
        metadataKeyFixture,
        propertyKeyFixture,
        metadataFixture,
      );

      reflectMetadata = Reflect.getOwnMetadata(
        metadataKeyFixture,
        targetFixture,
        propertyKeyFixture,
      );
    });

    it('should set metadata', () => {
      expect(reflectMetadata).toBe(metadataFixture);
    });

    it('should return undefined', () => {
      expect(result).toBeUndefined();
    });
  });
});
