import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

vitest.mock('@inversifyjs/reflect-metadata-utils');

import {
  getReflectMetadataWithProperty,
  setReflectMetadataWithProperty,
} from '@inversifyjs/reflect-metadata-utils';

import { controllerMethodHeaderMetadataReflectKey } from '../../reflectMetadata/data/controllerMethodHeaderMetadataReflectKey';
import { setHeader } from './SetHeader';

describe(setHeader.name, () => {
  describe('when called and getReflectMetadata returns undefined', () => {
    let controllerFixture: NewableFunction;
    let controllerMethodKeyFixture: string | symbol;
    let descriptorFixture: PropertyDescriptor;
    let keyFixture: string;
    let valueFixture: string;

    beforeAll(() => {
      controllerFixture = class Test {};
      controllerMethodKeyFixture = 'testMethod';
      descriptorFixture = {
        value: 'value-descriptor-example',
      } as PropertyDescriptor;
      keyFixture = 'key-example';
      valueFixture = 'value-example';

      setHeader(keyFixture, valueFixture)(
        controllerFixture,
        controllerMethodKeyFixture,
        descriptorFixture,
      );
    });

    afterAll(() => {
      vitest.clearAllMocks();
    });

    it('should call getReflectMetadataWithProperty', () => {
      expect(getReflectMetadataWithProperty).toHaveBeenCalledTimes(1);
      expect(getReflectMetadataWithProperty).toHaveBeenCalledWith(
        controllerFixture,
        controllerMethodHeaderMetadataReflectKey,
        controllerMethodKeyFixture,
      );
    });

    it('should call setReflectMetadata', () => {
      expect(setReflectMetadataWithProperty).toHaveBeenCalledTimes(1);
      expect(setReflectMetadataWithProperty).toHaveBeenCalledWith(
        controllerFixture,
        controllerMethodHeaderMetadataReflectKey,
        controllerMethodKeyFixture,
        new Map([[keyFixture, valueFixture]]),
      );
    });
  });

  describe('when called and getReflectMetadata returns a Map with undefined key', () => {
    let controllerFixture: NewableFunction;
    let controllerMethodKeyFixture: string | symbol;
    let descriptorFixture: PropertyDescriptor;
    let headerMetadataFixture: Map<string, string>;
    let keyFixture: string;
    let valueFixture: string;

    beforeAll(() => {
      controllerFixture = class Test {};
      controllerMethodKeyFixture = 'testMethod';
      descriptorFixture = {
        value: 'value-descriptor-example',
      } as PropertyDescriptor;
      headerMetadataFixture = new Map();
      keyFixture = 'key-example';
      valueFixture = 'value-example';

      vitest
        .mocked(getReflectMetadataWithProperty)
        .mockReturnValueOnce(headerMetadataFixture);

      setHeader(keyFixture, valueFixture)(
        controllerFixture,
        controllerMethodKeyFixture,
        descriptorFixture,
      );
    });

    afterAll(() => {
      vitest.clearAllMocks();
    });

    it('should call getReflectMetadataWithProperty', () => {
      expect(getReflectMetadataWithProperty).toHaveBeenCalledTimes(1);
      expect(getReflectMetadataWithProperty).toHaveBeenCalledWith(
        controllerFixture,
        controllerMethodHeaderMetadataReflectKey,
        controllerMethodKeyFixture,
      );
    });

    it('should call setReflectMetadataWithProperty', () => {
      expect(setReflectMetadataWithProperty).toHaveBeenCalledTimes(1);
      expect(setReflectMetadataWithProperty).toHaveBeenCalledWith(
        controllerFixture,
        controllerMethodHeaderMetadataReflectKey,
        controllerMethodKeyFixture,
        headerMetadataFixture,
      );
    });
  });

  describe('when called and getReflectMetadata returns a Map with defined key', () => {
    let controllerFixture: NewableFunction;
    let controllerMethodKeyFixture: string | symbol;
    let descriptorFixture: PropertyDescriptor;
    let headerMetadataFixture: Map<string, string>;
    let keyFixture: string;
    let valueFixture: string;

    beforeAll(() => {
      controllerFixture = class Test {};
      controllerMethodKeyFixture = 'testMethod';
      descriptorFixture = {
        value: 'value-descriptor-example',
      } as PropertyDescriptor;
      headerMetadataFixture = new Map();
      keyFixture = 'key-example';
      valueFixture = 'value-example';
      headerMetadataFixture.set(keyFixture, valueFixture);

      vitest
        .mocked(getReflectMetadataWithProperty)
        .mockReturnValueOnce(headerMetadataFixture);

      setHeader(keyFixture, valueFixture)(
        controllerFixture,
        controllerMethodKeyFixture,
        descriptorFixture,
      );
    });

    afterAll(() => {
      vitest.clearAllMocks();
    });

    it('should call getReflectMetadataWithProperty', () => {
      expect(getReflectMetadataWithProperty).toHaveBeenCalledTimes(1);
      expect(getReflectMetadataWithProperty).toHaveBeenCalledWith(
        controllerFixture,
        controllerMethodHeaderMetadataReflectKey,
        controllerMethodKeyFixture,
      );
    });

    it('should call setReflectMetadataWithProperty', () => {
      expect(setReflectMetadataWithProperty).toHaveBeenCalledTimes(1);
      expect(setReflectMetadataWithProperty).toHaveBeenCalledWith(
        controllerFixture,
        controllerMethodHeaderMetadataReflectKey,
        controllerMethodKeyFixture,
        headerMetadataFixture,
      );
    });
  });
});
