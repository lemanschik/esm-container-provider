import { controller, Get, query } from '@inversifyjs/http-core';

import { WarriorWithQuery } from '../models/WarriorWithQuery';

@controller('/warriors')
export class WarriorsGetQueryNamedController {
  @Get()
  public async getWarrior(
    @query('filter') filter: string,
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
