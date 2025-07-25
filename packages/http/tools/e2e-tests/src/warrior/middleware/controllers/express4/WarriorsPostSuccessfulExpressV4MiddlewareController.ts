import { applyMiddleware, controller, Post } from '@inversifyjs/http-core';

import { SuccessfulExpressV4Middleware } from '../../middlewares/express4/SuccessfulExpressV4Middleware';

@controller('/warriors')
export class WarriorsPostSuccessfulExpressV4MiddlewareController {
  @applyMiddleware(SuccessfulExpressV4Middleware)
  @Post()
  public async postWarrior(): Promise<void> {}
}
