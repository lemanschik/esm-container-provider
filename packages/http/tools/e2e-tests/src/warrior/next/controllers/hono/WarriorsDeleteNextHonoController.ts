import {
  ApplyMiddleware,
  Controller,
  Delete,
  MiddlewarePhase,
  next,
} from '@inversifyjs/http-core';
import { Next } from 'hono';

import { NextHonoMiddleware } from '../../middlewares/NextHonoMiddleware';

@Controller('/warriors')
export class WarriorsDeleteNextHonoController {
  @ApplyMiddleware({
    middleware: NextHonoMiddleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Delete()
  public async deleteWarrior(@next() nextFn: Next): Promise<void> {
    await nextFn();
  }
}
