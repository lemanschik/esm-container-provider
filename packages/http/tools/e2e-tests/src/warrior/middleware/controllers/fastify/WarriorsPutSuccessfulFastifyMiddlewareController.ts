import { applyMiddleware, controller, Put } from '@inversifyjs/http-core';

import { SuccessfulFastifyMiddleware } from '../../middlewares/fastify/SuccessfulFastifyMiddleware';

@controller('/warriors')
export class WarriorsPutSuccessfulFastifyMiddlewareController {
  @applyMiddleware(SuccessfulFastifyMiddleware)
  @Put()
  public async putWarrior(): Promise<void> {}
}
