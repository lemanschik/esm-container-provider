import { applyMiddleware, controller, Get } from '@inversifyjs/http-core';

import { SuccessfulHonoMiddleware } from '../../middlewares/hono/SuccessfulHonoMiddleware';
import { UnsuccessfulHonoMiddleware } from '../../middlewares/hono/UnsuccessfulHonoMiddleware';

@controller('/warriors')
export class WarriorsGetUnsuccessfulHonoMiddlewareController {
  @applyMiddleware(SuccessfulHonoMiddleware, UnsuccessfulHonoMiddleware)
  @Get()
  public async getWarrior(): Promise<void> {}
}
