import { describe, expect, it } from 'vitest';

import { Katana, Shuriken, weapons } from './containerApiGetAllChained';

describe('Container API (getAll)', () => {
  it('should provide weapons', () => {
    expect(weapons).toStrictEqual([new Shuriken(), new Katana()]);
  });
});
