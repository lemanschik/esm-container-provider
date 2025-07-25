import { Controller, Get, response } from '@inversifyjs/http-core';
import { Response } from 'express';

@Controller('/warriors')
export class WarriorsGetResponseExpressController {
  @Get()
  public async getWarrior(@response() response: Response): Promise<void> {
    response.send({
      damage: 10,
      health: 100,
      range: 1,
      speed: 10,
    });
  }
}
