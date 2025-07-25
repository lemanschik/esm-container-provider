import { Controller, PATCH, Response } from '@inversifyjs/http-core';
import { Response as ExpressResponse } from 'express';
@Controller('/warriors')
export class WarriorsPatchResponseExpressController {
  @PATCH()
  public async patchWarrior(
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
