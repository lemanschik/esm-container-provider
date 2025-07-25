import {
  applyMiddleware,
  controller,
  MiddlewarePhase,
  next,
  Put,
} from '@inversifyjs/http-core';
import { NextFunction } from 'express';

import { NextExpressMiddleware } from '../../middlewares/NextExpressMiddleware';

@controller('/warriors')
export class WarriorsPutNextExpressController {
  @applyMiddleware({
    middleware: NextExpressMiddleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Put()
  public putWarrior(@next() nextFn: NextFunction): void {
    nextFn();
  }
}
