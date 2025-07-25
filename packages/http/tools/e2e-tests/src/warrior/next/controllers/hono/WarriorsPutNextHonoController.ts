import {
  applyMiddleware,
  Controller,
  MiddlewarePhase,
  next,
  Put,
} from '@inversifyjs/http-core';
import { Next } from 'hono';

import { NextHonoMiddleware } from '../../middlewares/NextHonoMiddleware';

@Controller('/warriors')
export class WarriorsPutNextHonoController {
  @applyMiddleware({
    middleware: NextHonoMiddleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Put()
  public async putWarrior(@next() nextFn: Next): Promise<void> {
    await nextFn();
  }
}
