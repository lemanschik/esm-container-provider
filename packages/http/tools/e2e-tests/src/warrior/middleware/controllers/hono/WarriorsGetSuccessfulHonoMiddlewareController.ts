import { applyMiddleware, controller, Get } from '@inversifyjs/http-core';

import { SuccessfulHonoMiddleware } from '../../middlewares/hono/SuccessfulHonoMiddleware';

@controller('/warriors')
export class WarriorsGetSuccessfulHonoMiddlewareController {
  @applyMiddleware(SuccessfulHonoMiddleware)
  @Get()
  public async getWarrior(): Promise<void> {}
}
