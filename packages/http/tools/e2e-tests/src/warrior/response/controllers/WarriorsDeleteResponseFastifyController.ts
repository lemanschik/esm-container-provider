import { Controller, DELETE, Response } from '@inversifyjs/http-core';
import { FastifyReply } from 'fastify';

@Controller('/warriors')
export class WarriorsDeleteResponseFastifyController {
  @DELETE()
  public async deleteWarrior(
    @Response() response: FastifyReply,
  ): Promise<void> {
    response.send({
      damage: 10,
      health: 100,
      range: 1,
      speed: 10,
    });
  }
}
