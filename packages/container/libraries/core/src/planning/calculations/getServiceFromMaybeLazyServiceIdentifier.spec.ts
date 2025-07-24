import { beforeAll, describe, expect, it } from 'vitest';

import { LazyServiceIdentifier, ServiceIdentifier } from '@inversifyjs/common';

import { getServiceFromMaybeLazyServiceIdentifier } from './getServiceFromMaybeLazyServiceIdentifier';

describe(getServiceFromMaybeLazyServiceIdentifier, () => {
  describe('having LazyServiceIdentifier', () => {
    let serviceIdentifierFixture: ServiceIdentifier;
    let lazyServiceIdentifierFixture: LazyServiceIdentifier;

    beforeAll(() => {
      serviceIdentifierFixture = Symbol();

      lazyServiceIdentifierFixture = new LazyServiceIdentifier(
        () => serviceIdentifierFixture,
      );
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = getServiceFromMaybeLazyServiceIdentifier(
          lazyServiceIdentifierFixture,
        );
      });

      it('should return expected value', () => {
        expect(result).toBe(serviceIdentifierFixture);
      });
    });
  });

  describe('having ServiceIdentifier', () => {
    let serviceIdentifierFixture: ServiceIdentifier;

    beforeAll(() => {
      serviceIdentifierFixture = Symbol();
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = getServiceFromMaybeLazyServiceIdentifier(
          serviceIdentifierFixture,
        );
      });

      it('should return expected value', () => {
        expect(result).toBe(serviceIdentifierFixture);
      });
    });
  });
});
