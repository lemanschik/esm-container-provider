import { applyMiddleware, controller, Post } from '@inversifyjs/http-core';

import { SuccessfulFastifyMiddleware } from '../../middlewares/fastify/SuccessfulFastifyMiddleware';

@controller('/warriors')
export class WarriorsPostSuccessfulFastifyMiddlewareController {
  @applyMiddleware(SuccessfulFastifyMiddleware)
  @Post()
  public async postWarrior(): Promise<void> {}
}
