import { controller, Post, response } from '@inversifyjs/http-core';
import { Response } from 'express';

@controller('/warriors')
export class WarriorsPostResponseExpressV4Controller {
  @Post()
  public async postWarrior(@response() response: Response): Promise<void> {
    response.send({
      damage: 10,
      health: 100,
      range: 1,
      speed: 10,
    });
  }
}
