import {
  applyMiddleware,
  Controller,
  MiddlewarePhase,
  next,
  Patch,
} from '@inversifyjs/http-core';
import { Next } from 'hono';

import { NextHonoMiddleware } from '../../middlewares/NextHonoMiddleware';

@Controller('/warriors')
export class WarriorsPatchNextHonoController {
  @applyMiddleware({
    middleware: NextHonoMiddleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Patch()
  public async patchWarrior(@next() nextFn: Next): Promise<void> {
    await nextFn();
  }
}
