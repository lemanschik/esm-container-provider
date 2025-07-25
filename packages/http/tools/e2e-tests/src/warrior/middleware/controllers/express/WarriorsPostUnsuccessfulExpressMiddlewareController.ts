import { applyMiddleware, controller, Post } from '@inversifyjs/http-core';

import { SuccessfulExpressMiddleware } from '../../middlewares/express/SuccessfulExpressMiddleware';
import { UnsuccessfulExpressMiddleware } from '../../middlewares/express/UnsuccessfulExpressMiddleware';

@controller('/warriors')
export class WarriorsPostUnsuccessfulExpressMiddlewareController {
  @applyMiddleware(SuccessfulExpressMiddleware, UnsuccessfulExpressMiddleware)
  @Post()
  public async postWarrior(): Promise<void> {}
}
