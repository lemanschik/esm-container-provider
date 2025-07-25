import { applyMiddleware, Controller, Post } from '@inversifyjs/http-core';

import { SuccessfulExpressMiddleware } from '../../middlewares/express/SuccessfulExpressMiddleware';

@Controller('/warriors')
export class WarriorsPostSuccessfulExpressMiddlewareController {
  @applyMiddleware(SuccessfulExpressMiddleware)
  @Post()
  public async postWarrior(): Promise<void> {}
}
