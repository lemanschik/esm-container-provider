import {
  applyMiddleware,
  controller,
  MiddlewarePhase,
  next,
  Post,
} from '@inversifyjs/http-core';
import { NextFunction } from 'express4';

import { NextExpress4Middleware } from '../../middlewares/NextExpress4Middleware';

@controller('/warriors')
export class WarriorsPostNextExpress4Controller {
  @applyMiddleware({
    middleware: NextExpress4Middleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Post()
  public postWarrior(@next() nextFn: NextFunction): void {
    nextFn();
  }
}
