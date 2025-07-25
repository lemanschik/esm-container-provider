import { applyMiddleware, controller, Post } from '@inversifyjs/http-core';

import { SuccessfulFastifyMiddleware } from '../../middlewares/fastify/SuccessfulFastifyMiddleware';
import { UnsuccessfulFastifyMiddleware } from '../../middlewares/fastify/UnsuccessfulFastifyMiddleware';

@controller('/warriors')
export class WarriorsPostUnsuccessfulFastifyMiddlewareController {
  @applyMiddleware(SuccessfulFastifyMiddleware, UnsuccessfulFastifyMiddleware)
  @Post()
  public async postWarrior(): Promise<void> {}
}
