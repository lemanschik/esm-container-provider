import { Controller, PATCH, response } from '@inversifyjs/http-core';
import { Response } from 'express';

@Controller('/warriors')
export class WarriorsPatchResponseExpressV4Controller {
  @PATCH()
  public async patchWarrior(@response() response: Response): Promise<void> {
    response.send({
      damage: 10,
      health: 100,
      range: 1,
      speed: 10,
    });
  }
}
