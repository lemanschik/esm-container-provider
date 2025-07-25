import { Controller, Put, response } from '@inversifyjs/http-core';
import { FastifyReply } from 'fastify';

@Controller('/warriors')
export class WarriorsPutResponseFastifyController {
  @Put()
  public async putWarrior(@response() response: FastifyReply): Promise<void> {
    response.send({
      damage: 10,
      health: 100,
      range: 1,
      speed: 10,
    });
  }
}
