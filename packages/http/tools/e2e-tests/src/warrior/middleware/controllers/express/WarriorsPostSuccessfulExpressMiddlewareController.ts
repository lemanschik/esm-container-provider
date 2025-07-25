import { applyMiddleware, controller, Post } from '@inversifyjs/http-core';

import { SuccessfulExpressMiddleware } from '../../middlewares/express/SuccessfulExpressMiddleware';

@controller('/warriors')
export class WarriorsPostSuccessfulExpressMiddlewareController {
  @applyMiddleware(SuccessfulExpressMiddleware)
  @Post()
  public async postWarrior(): Promise<void> {}
}
