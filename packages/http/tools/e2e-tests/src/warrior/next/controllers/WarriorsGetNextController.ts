import {
  applyMiddleware,
  controller,
  Get,
  MiddlewarePhase,
  next,
} from '@inversifyjs/http-core';

import { NextHonoMiddleware } from '../middlewares/NextHonoMiddleware';

@controller('/warriors')
export class WarriorsGetNextController {
  @applyMiddleware({
    middleware: NextHonoMiddleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Get()
  public async getWarrior(@next() nextFn: () => Promise<void>): Promise<void> {
    await nextFn();
  }
}
