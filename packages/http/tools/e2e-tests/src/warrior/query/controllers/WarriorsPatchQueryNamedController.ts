import { Controller, PATCH, Query } from '@inversifyjs/http-core';

import { WarriorWithQuery } from '../models/WarriorWithQuery';

@Controller('/warriors')
export class WarriorsPatchQueryNamedController {
  @PATCH()
  public async patchWarrior(
    @Query('filter') filter: string,
  ): Promise<WarriorWithQuery> {
    return {
      damage: 10,
      filter,
      health: 100,
      range: 1,
      speed: 10,
    };
  }
}
