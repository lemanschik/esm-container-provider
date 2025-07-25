import {
  ApplyMiddleware,
  Controller,
  Get,
  MiddlewarePhase,
  next,
} from '@inversifyjs/http-core';

import { NextHonoMiddleware } from '../middlewares/NextHonoMiddleware';

@Controller('/warriors')
export class WarriorsGetNextController {
  @ApplyMiddleware({
    middleware: NextHonoMiddleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Get()
  public async getWarrior(@next() nextFn: () => Promise<void>): Promise<void> {
    await nextFn();
  }
}
