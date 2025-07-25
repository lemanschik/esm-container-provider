import { Controller, Options, response } from '@inversifyjs/http-core';
import { FastifyReply } from 'fastify';

@Controller('/warriors')
export class WarriorsOptionsResponseFastifyController {
  @Options()
  public async optionsWarrior(
    @response() response: FastifyReply,
  ): Promise<void> {
    response.send({
      damage: 10,
      health: 100,
      range: 1,
      speed: 10,
    });
  }
}
