import { controller, Post, response } from '@inversifyjs/http-core';
import { FastifyReply } from 'fastify';

@controller('/warriors')
export class WarriorsPostResponseFastifyController {
  @Post()
  public async postWarrior(@response() response: FastifyReply): Promise<void> {
    response.send({
      damage: 10,
      health: 100,
      range: 1,
      speed: 10,
    });
  }
}
