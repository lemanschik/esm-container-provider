import { applyMiddleware, controller, Put } from '@inversifyjs/http-core';

import { SuccessfulExpressV4Middleware } from '../../middlewares/express4/SuccessfulExpressV4Middleware';

@controller('/warriors')
export class WarriorsPutSuccessfulExpressV4MiddlewareController {
  @applyMiddleware(SuccessfulExpressV4Middleware)
  @Put()
  public async putWarrior(): Promise<void> {}
}
