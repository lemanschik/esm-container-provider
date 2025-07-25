import { applyMiddleware, controller, Put } from '@inversifyjs/http-core';

import { SuccessfulHonoMiddleware } from '../../middlewares/hono/SuccessfulHonoMiddleware';

@controller('/warriors')
export class WarriorsPutSuccessfulHonoMiddlewareController {
  @applyMiddleware(SuccessfulHonoMiddleware)
  @Put()
  public async putWarrior(): Promise<void> {}
}
