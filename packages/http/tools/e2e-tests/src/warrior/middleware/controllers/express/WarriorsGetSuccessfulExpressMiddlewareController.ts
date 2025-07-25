import { applyMiddleware, controller, Get } from '@inversifyjs/http-core';

import { SuccessfulExpressMiddleware } from '../../middlewares/express/SuccessfulExpressMiddleware';

@controller('/warriors')
export class WarriorsGetSuccessfulExpressMiddlewareController {
  @applyMiddleware(SuccessfulExpressMiddleware)
  @Get()
  public async getWarrior(): Promise<void> {}
}
