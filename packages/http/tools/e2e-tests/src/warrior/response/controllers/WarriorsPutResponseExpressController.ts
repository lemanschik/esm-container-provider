import { Controller, Put, response } from '@inversifyjs/http-core';
import { Response } from 'express';

@Controller('/warriors')
export class WarriorsPutResponseExpressController {
  @Put()
  public async putWarrior(@response() response: Response): Promise<void> {
    response.send({
      damage: 10,
      health: 100,
      range: 1,
      speed: 10,
    });
  }
}
