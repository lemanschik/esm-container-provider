import { beforeAll, describe, expect, it } from 'vitest';

import { LazyServiceIdentifier, ServiceIdentifier } from '@inversifyjs/common';

import { MetadataTag } from '../../metadata/models/MetadataTag';
import { MultipleInjectionResolvedValueElementMetadata } from '../../metadata/models/MultipleInjectionResolvedValueElementMetadata';
import { ResolvedValueElementMetadata } from '../../metadata/models/ResolvedValueElementMetadata';
import { ResolvedValueElementMetadataKind } from '../../metadata/models/ResolvedValueElementMetadataKind';
import { SingleInjectionResolvedValueElementMetadata } from '../../metadata/models/SingleInjectionResolvedValueElementMetadata';
import { GetPlanOptions } from '../models/GetPlanOptions';
import { tryBuildGetPlanOptionsFromResolvedValueElementMetadata } from './tryBuildGetPlanOptionsFromResolvedValueElementMetadata';

describe(tryBuildGetPlanOptionsFromResolvedValueElementMetadata, () => {
  describe('having ResolvedValueElementMetadata with LazyServiceIdentifier', () => {
    let serviceIdentifierFixture: ServiceIdentifier;
    let resolvedValueElementMetadataFixture: ResolvedValueElementMetadata;

    beforeAll(() => {
      serviceIdentifierFixture = Symbol();
      resolvedValueElementMetadataFixture = {
        kind: ResolvedValueElementMetadataKind.singleInjection,
        name: undefined,
        optional: false,
        tags: new Map(),
        value: new LazyServiceIdentifier(() => serviceIdentifierFixture),
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = tryBuildGetPlanOptionsFromResolvedValueElementMetadata(
          resolvedValueElementMetadataFixture,
        );
      });

      it('should return GetPlanOptions', () => {
        const expected: GetPlanOptions = {
          isMultiple: false,
          name: resolvedValueElementMetadataFixture.name,
          optional: resolvedValueElementMetadataFixture.optional,
          serviceIdentifier: serviceIdentifierFixture,
          tag: undefined,
        };

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe('having ResolvedValueElementMetadata with no tags', () => {
    let resolvedValueElementMetadataFixture: SingleInjectionResolvedValueElementMetadata;

    beforeAll(() => {
      resolvedValueElementMetadataFixture = {
        kind: ResolvedValueElementMetadataKind.singleInjection,
        name: undefined,
        optional: false,
        tags: new Map(),
        value: Symbol(),
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = tryBuildGetPlanOptionsFromResolvedValueElementMetadata(
          resolvedValueElementMetadataFixture,
        );
      });

      it('should return GetPlanOptions', () => {
        const expected: GetPlanOptions = {
          isMultiple: false,
          name: resolvedValueElementMetadataFixture.name,
          optional: resolvedValueElementMetadataFixture.optional,
          serviceIdentifier:
            resolvedValueElementMetadataFixture.value as ServiceIdentifier,
          tag: undefined,
        };

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe('having ResolvedValueElementMetadata with a single tag', () => {
    let tagKeyFixture: MetadataTag;
    let tagValueFixture: unknown;
    let resolvedValueElementMetadataFixture: SingleInjectionResolvedValueElementMetadata;

    beforeAll(() => {
      tagKeyFixture = 'key';
      tagValueFixture = 'value';
      resolvedValueElementMetadataFixture = {
        kind: ResolvedValueElementMetadataKind.singleInjection,
        name: undefined,
        optional: false,
        tags: new Map([[tagKeyFixture, tagValueFixture]]),
        value: Symbol(),
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = tryBuildGetPlanOptionsFromResolvedValueElementMetadata(
          resolvedValueElementMetadataFixture,
        );
      });

      it('should return GetPlanOptions', () => {
        const expected: GetPlanOptions = {
          isMultiple: false,
          name: resolvedValueElementMetadataFixture.name,
          optional: resolvedValueElementMetadataFixture.optional,
          serviceIdentifier:
            resolvedValueElementMetadataFixture.value as ServiceIdentifier,
          tag: {
            key: tagKeyFixture,
            value: tagValueFixture,
          },
        };

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe('having ResolvedValueElementMetadata with multiple tags', () => {
    let resolvedValueElementMetadataFixture: SingleInjectionResolvedValueElementMetadata;

    beforeAll(() => {
      resolvedValueElementMetadataFixture = {
        kind: ResolvedValueElementMetadataKind.singleInjection,
        name: undefined,
        optional: false,
        tags: new Map([
          ['key1', 'value1'],
          ['key2', 'value2'],
        ]),
        value: Symbol(),
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = tryBuildGetPlanOptionsFromResolvedValueElementMetadata(
          resolvedValueElementMetadataFixture,
        );
      });

      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });
  });

  describe('having MultipleInjectionResolvedValueElementMetadata', () => {
    let multipleInjectionResolvedValueElementMetadataFixture: MultipleInjectionResolvedValueElementMetadata;

    beforeAll(() => {
      multipleInjectionResolvedValueElementMetadataFixture = {
        chained: false,
        kind: ResolvedValueElementMetadataKind.multipleInjection,
        name: undefined,
        optional: false,
        tags: new Map(),
        value: Symbol(),
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = tryBuildGetPlanOptionsFromResolvedValueElementMetadata(
          multipleInjectionResolvedValueElementMetadataFixture,
        );
      });

      it('should return GetPlanOptions', () => {
        const expected: GetPlanOptions = {
          chained: multipleInjectionResolvedValueElementMetadataFixture.chained,
          isMultiple: true,
          name: multipleInjectionResolvedValueElementMetadataFixture.name,
          optional:
            multipleInjectionResolvedValueElementMetadataFixture.optional,
          serviceIdentifier:
            multipleInjectionResolvedValueElementMetadataFixture.value as ServiceIdentifier,
          tag: undefined,
        };

        expect(result).toStrictEqual(expected);
      });
    });
  });

  describe('having SingleInjectionResolvedValueElementMetadata', () => {
    let singleInjectionResolvedValueElementMetadataFixture: SingleInjectionResolvedValueElementMetadata;

    beforeAll(() => {
      singleInjectionResolvedValueElementMetadataFixture = {
        kind: ResolvedValueElementMetadataKind.singleInjection,
        name: undefined,
        optional: false,
        tags: new Map(),
        value: Symbol(),
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = tryBuildGetPlanOptionsFromResolvedValueElementMetadata(
          singleInjectionResolvedValueElementMetadataFixture,
        );
      });

      it('should return GetPlanOptions', () => {
        const expected: GetPlanOptions = {
          isMultiple: false,
          name: singleInjectionResolvedValueElementMetadataFixture.name,
          optional: singleInjectionResolvedValueElementMetadataFixture.optional,
          serviceIdentifier:
            singleInjectionResolvedValueElementMetadataFixture.value as ServiceIdentifier,
          tag: undefined,
        };

        expect(result).toStrictEqual(expected);
      });
    });
  });
});
