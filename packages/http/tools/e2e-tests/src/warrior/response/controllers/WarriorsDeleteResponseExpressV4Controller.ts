import { Controller, DELETE, Response } from '@inversifyjs/http-core';
import { Response as ExpressResponse } from 'express';

@Controller('/warriors')
export class WarriorsDeleteResponseExpressV4Controller {
  @DELETE()
  public async deleteWarrior(
    @Response() response: ExpressResponse,
  ): Promise<void> {
    response.send({
      damage: 10,
      health: 100,
      range: 1,
      speed: 10,
    });
  }
}
