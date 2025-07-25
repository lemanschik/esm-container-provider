import {
  ApplyMiddleware,
  Controller,
  Get,
  MiddlewarePhase,
  next,
} from '@inversifyjs/http-core';
import { Next } from 'hono';

import { NextHonoMiddleware } from '../../middlewares/NextHonoMiddleware';

@Controller('/warriors')
export class WarriorsGetNextHonoController {
  @ApplyMiddleware({
    middleware: NextHonoMiddleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Get()
  public async getWarrior(@next() nextFn: Next): Promise<void> {
    await nextFn();
  }
}
