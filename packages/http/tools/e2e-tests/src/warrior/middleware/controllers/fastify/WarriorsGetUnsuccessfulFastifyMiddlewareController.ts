import { applyMiddleware, controller, Get } from '@inversifyjs/http-core';

import { SuccessfulFastifyMiddleware } from '../../middlewares/fastify/SuccessfulFastifyMiddleware';
import { UnsuccessfulFastifyMiddleware } from '../../middlewares/fastify/UnsuccessfulFastifyMiddleware';

@controller('/warriors')
export class WarriorsGetUnsuccessfulFastifyMiddlewareController {
  @applyMiddleware(SuccessfulFastifyMiddleware, UnsuccessfulFastifyMiddleware)
  @Get()
  public async getWarrior(): Promise<void> {}
}
