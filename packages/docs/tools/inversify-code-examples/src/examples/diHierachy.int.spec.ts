import { describe, expect, it } from 'vitest';

import { Katana, katana } from './diHierarchy';

describe('DI Hierarchy', () => {
  it('should provide a Katana', () => {
    expect(katana).toBeInstanceOf(Katana);
  });
});
