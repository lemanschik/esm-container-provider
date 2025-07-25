import {
  applyMiddleware,
  Controller,
  MiddlewarePhase,
  next,
  Patch,
} from '@inversifyjs/http-core';

import { NextHonoMiddleware } from '../middlewares/NextHonoMiddleware';

@Controller('/warriors')
export class WarriorsPatchNextController {
  @applyMiddleware({
    middleware: NextHonoMiddleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Patch()
  public async patchWarrior(
    @next() nextFn: () => Promise<void>,
  ): Promise<void> {
    await nextFn();
  }
}
