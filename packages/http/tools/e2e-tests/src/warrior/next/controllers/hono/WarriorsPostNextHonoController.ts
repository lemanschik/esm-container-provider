import {
  ApplyMiddleware,
  Controller,
  MiddlewarePhase,
  next,
  Post,
} from '@inversifyjs/http-core';
import { Next } from 'hono';

import { NextHonoMiddleware } from '../../middlewares/NextHonoMiddleware';

@Controller('/warriors')
export class WarriorsPostNextHonoController {
  @ApplyMiddleware({
    middleware: NextHonoMiddleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Post()
  public async putWarrior(@next() nextFn: Next): Promise<void> {
    await nextFn();
  }
}
