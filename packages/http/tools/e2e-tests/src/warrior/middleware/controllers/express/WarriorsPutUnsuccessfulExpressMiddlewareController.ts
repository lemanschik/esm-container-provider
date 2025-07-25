import { applyMiddleware, controller, Put } from '@inversifyjs/http-core';

import { SuccessfulExpressMiddleware } from '../../middlewares/express/SuccessfulExpressMiddleware';
import { UnsuccessfulExpressMiddleware } from '../../middlewares/express/UnsuccessfulExpressMiddleware';

@controller('/warriors')
export class WarriorsPutUnsuccessfulExpressMiddlewareController {
  @applyMiddleware(SuccessfulExpressMiddleware, UnsuccessfulExpressMiddleware)
  @Put()
  public async putWarrior(): Promise<void> {}
}
