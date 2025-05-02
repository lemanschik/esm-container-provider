import { afterAll, beforeAll, describe, expect, it, vitest } from 'vitest';

vitest.mock('@inversifyjs/reflect-metadata-utils');

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
import { applyMiddleware } from './ApplyMiddleware';

describe(applyMiddleware.name, () => {
  describe('having a ClassDecorator', () => {
    describe('when called and getReflectMetadata returns undefined', () => {
      let middlewareFixture: Newable<Middleware>;
      let targetFixture: NewableFunction;

      beforeAll(() => {
        middlewareFixture = {} as Newable<Middleware>;
        targetFixture = class TestController {};

        applyMiddleware(middlewareFixture)(targetFixture);
      });

      afterAll(() => {
        vitest.clearAllMocks();
      });

      it('should call getReflectMetadata', () => {
        expect(getReflectMetadata).toHaveBeenCalledTimes(1);
        expect(getReflectMetadata).toHaveBeenCalledWith(
          targetFixture,
          controllerMiddlewareMetadataReflectKey,
        );
      });

      it('should call setReflectMetadata', () => {
        expect(setReflectMetadata).toHaveBeenCalledTimes(1);
        expect(setReflectMetadata).toHaveBeenCalledWith(
          targetFixture,
          controllerMiddlewareMetadataReflectKey,
          [middlewareFixture],
        );
      });
    });
  });

  describe('having a MethodDecorator', () => {
    describe('when called and getReflectMetadata returns a Middleware list', () => {
      let controllerFixture: NewableFunction;
      let controllerMethodKeyFixture: string | symbol;
      let descriptorFixture: PropertyDescriptor;
      let middlewareFixture: Newable<Middleware>;

      beforeAll(() => {
        controllerFixture = class Test {};
        controllerMethodKeyFixture = 'testMethod';
        middlewareFixture = {} as Newable<Middleware>;
        descriptorFixture = {
          value: 'value-descriptor-example',
        } as PropertyDescriptor;

        vitest.mocked(getReflectMetadataWithProperty).mockReturnValueOnce([]);

        applyMiddleware(middlewareFixture)(
          controllerFixture,
          controllerMethodKeyFixture,
          descriptorFixture,
        );
      });

      it('should call getReflectMetadataWithProperty', () => {
        expect(getReflectMetadataWithProperty).toHaveBeenCalledTimes(1);
        expect(getReflectMetadataWithProperty).toHaveBeenCalledWith(
          controllerFixture,
          controllerMethodMiddlewareMetadataReflectKey,
          controllerMethodKeyFixture,
        );
      });

      it('should call setReflectMetadataWithProperty', () => {
        expect(setReflectMetadataWithProperty).toHaveBeenCalledTimes(1);
        expect(setReflectMetadataWithProperty).toHaveBeenCalledWith(
          controllerFixture,
          controllerMethodMiddlewareMetadataReflectKey,
          controllerMethodKeyFixture,
          [middlewareFixture],
        );
      });
    });
  });
});
