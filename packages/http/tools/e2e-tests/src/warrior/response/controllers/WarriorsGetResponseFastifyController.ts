import { Controller, Get, response } from '@inversifyjs/http-core';
import { FastifyReply } from 'fastify';

@Controller('/warriors')
export class WarriorsGetResponseFastifyController {
  @Get()
  public async getWarrior(@response() response: FastifyReply): Promise<void> {
    response.send({
      damage: 10,
      health: 100,
      range: 1,
      speed: 10,
    });
  }
}
