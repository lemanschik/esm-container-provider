import { Controller, Get, params } from '@inversifyjs/http-core';

import { WarriorWithId } from '../models/WarriorWithId';

@Controller('/warriors')
export class WarriorsGetParamsController {
  @Get('/:id')
  public async getWarrior(
    @params() params: { id: string },
  ): Promise<WarriorWithId> {
    return {
      damage: 10,
      health: 100,
      id: params.id,
      range: 1,
      speed: 10,
    };
  }
}
