import { applyMiddleware, controller, Get } from '@inversifyjs/http-core';

import { SuccessfulFastifyMiddleware } from '../../middlewares/fastify/SuccessfulFastifyMiddleware';

@controller('/warriors')
export class WarriorsGetSuccessfulFastifyMiddlewareController {
  @applyMiddleware(SuccessfulFastifyMiddleware)
  @Get()
  public async getWarrior(): Promise<void> {}
}
