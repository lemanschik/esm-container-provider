import { applyMiddleware, Controller, Put } from '@inversifyjs/http-core';

import { SuccessfulExpressMiddleware } from '../../middlewares/express/SuccessfulExpressMiddleware';

@Controller('/warriors')
export class WarriorsPutSuccessfulExpressMiddlewareController {
  @applyMiddleware(SuccessfulExpressMiddleware)
  @Put()
  public async putWarrior(): Promise<void> {}
}
