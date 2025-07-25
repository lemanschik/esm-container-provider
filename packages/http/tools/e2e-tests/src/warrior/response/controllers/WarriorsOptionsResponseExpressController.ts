import { Controller, Options, response } from '@inversifyjs/http-core';
import { Response } from 'express';

@Controller('/warriors')
export class WarriorsOptionsResponseExpressController {
  @Options()
  public async optionsWarrior(@response() response: Response): Promise<void> {
    response.send({
      damage: 10,
      health: 100,
      range: 1,
      speed: 10,
    });
  }
}
