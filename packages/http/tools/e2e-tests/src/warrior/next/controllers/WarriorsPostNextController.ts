import {
  applyMiddleware,
  Controller,
  MiddlewarePhase,
  next,
  Post,
} from '@inversifyjs/http-core';

import { NextHonoMiddleware } from '../middlewares/NextHonoMiddleware';

@Controller('/warriors')
export class WarriorsPostNextController {
  @applyMiddleware({
    middleware: NextHonoMiddleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Post()
  public async postWarrior(@next() nextFn: () => Promise<void>): Promise<void> {
    await nextFn();
  }
}
