import { applyMiddleware, controller, Put } from '@inversifyjs/http-core';

import { SuccessfulExpressMiddleware } from '../../middlewares/express/SuccessfulExpressMiddleware';

@controller('/warriors')
export class WarriorsPutSuccessfulExpressMiddlewareController {
  @applyMiddleware(SuccessfulExpressMiddleware)
  @Put()
  public async putWarrior(): Promise<void> {}
}
