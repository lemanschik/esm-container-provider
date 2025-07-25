import { applyMiddleware, controller, Get } from '@inversifyjs/http-core';

import { SuccessfulExpressMiddleware } from '../../middlewares/express/SuccessfulExpressMiddleware';
import { UnsuccessfulExpressMiddleware } from '../../middlewares/express/UnsuccessfulExpressMiddleware';

@controller('/warriors')
export class WarriorsGetUnsuccessfulExpressMiddlewareController {
  @applyMiddleware(SuccessfulExpressMiddleware, UnsuccessfulExpressMiddleware)
  @Get()
  public async getWarrior(): Promise<void> {}
}
