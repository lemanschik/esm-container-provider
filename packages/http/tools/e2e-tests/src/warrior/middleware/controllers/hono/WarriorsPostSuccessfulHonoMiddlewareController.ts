import { applyMiddleware, controller, Post } from '@inversifyjs/http-core';

import { SuccessfulHonoMiddleware } from '../../middlewares/hono/SuccessfulHonoMiddleware';

@controller('/warriors')
export class WarriorsPostSuccessfulHonoMiddlewareController {
  @applyMiddleware(SuccessfulHonoMiddleware)
  @Post()
  public async postWarrior(): Promise<void> {}
}
