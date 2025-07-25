import { Controller, DELETE, response } from '@inversifyjs/http-core';
import { Response } from 'express';

@Controller('/warriors')
export class WarriorsDeleteResponseExpressController {
  @DELETE()
  public async deleteWarrior(@response() response: Response): Promise<void> {
    response.send({
      damage: 10,
      health: 100,
      range: 1,
      speed: 10,
    });
  }
}
