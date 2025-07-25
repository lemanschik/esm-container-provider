import {
  applyMiddleware,
  Controller,
  MiddlewarePhase,
  next,
  Options,
} from '@inversifyjs/http-core';
import { NextFunction } from 'express4';

import { NextExpress4Middleware } from '../../middlewares/NextExpress4Middleware';

@Controller('/warriors')
export class WarriorsOptionsNextExpress4Controller {
  @applyMiddleware({
    middleware: NextExpress4Middleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Options()
  public optionsWarrior(@next() nextFn: NextFunction): void {
    nextFn();
  }
}
