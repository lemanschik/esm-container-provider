import { applyMiddleware, Controller, Post } from '@inversifyjs/http-core';

import { SuccessfulHonoMiddleware } from '../../middlewares/hono/SuccessfulHonoMiddleware';

@Controller('/warriors')
export class WarriorsPostSuccessfulHonoMiddlewareController {
  @applyMiddleware(SuccessfulHonoMiddleware)
  @Post()
  public async postWarrior(): Promise<void> {}
}
