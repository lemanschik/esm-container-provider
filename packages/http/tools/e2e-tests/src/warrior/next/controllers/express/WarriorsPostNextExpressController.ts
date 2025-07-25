import {
  applyMiddleware,
  controller,
  MiddlewarePhase,
  next,
  Post,
} from '@inversifyjs/http-core';
import { NextFunction } from 'express';

import { NextExpressMiddleware } from '../../middlewares/NextExpressMiddleware';

@controller('/warriors')
export class WarriorsPostNextExpressController {
  @applyMiddleware({
    middleware: NextExpressMiddleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Post()
  public postWarrior(@next() nextFn: NextFunction): void {
    nextFn();
  }
}
