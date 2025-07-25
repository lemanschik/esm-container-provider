import { applyMiddleware, controller, Post } from '@inversifyjs/http-core';

import { SuccessfulHonoMiddleware } from '../../middlewares/hono/SuccessfulHonoMiddleware';
import { UnsuccessfulHonoMiddleware } from '../../middlewares/hono/UnsuccessfulHonoMiddleware';

@controller('/warriors')
export class WarriorsPostUnsuccessfulHonoMiddlewareController {
  @applyMiddleware(SuccessfulHonoMiddleware, UnsuccessfulHonoMiddleware)
  @Post()
  public async postWarrior(): Promise<void> {}
}
