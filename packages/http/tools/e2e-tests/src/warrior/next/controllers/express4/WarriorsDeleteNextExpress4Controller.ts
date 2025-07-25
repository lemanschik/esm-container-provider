import {
  ApplyMiddleware,
  Controller,
  Delete,
  MiddlewarePhase,
  next,
} from '@inversifyjs/http-core';
import { NextFunction } from 'express4';

import { NextExpress4Middleware } from '../../middlewares/NextExpress4Middleware';

@Controller('/warriors')
export class WarriorsDeleteNextExpress4Controller {
  @ApplyMiddleware({
    middleware: NextExpress4Middleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Delete()
  public deleteWarrior(@next() nextFn: NextFunction): void {
    nextFn();
  }
}
