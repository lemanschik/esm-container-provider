import {
  ApplyMiddleware,
  Controller,
  Delete,
  MiddlewarePhase,
  next,
} from '@inversifyjs/http-core';

import { NextHonoMiddleware } from '../middlewares/NextHonoMiddleware';

@Controller('/warriors')
export class WarriorsDeleteNextController {
  @ApplyMiddleware({
    middleware: NextHonoMiddleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Delete()
  public async deleteWarrior(
    @next() nextFn: () => Promise<void>,
  ): Promise<void> {
    await nextFn();
  }
}
