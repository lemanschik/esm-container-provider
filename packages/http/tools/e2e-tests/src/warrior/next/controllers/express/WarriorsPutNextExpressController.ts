import {
  ApplyMiddleware,
  Controller,
  MiddlewarePhase,
  next,
  Put,
} from '@inversifyjs/http-core';
import { NextFunction } from 'express';

import { NextExpressMiddleware } from '../../middlewares/NextExpressMiddleware';

@Controller('/warriors')
export class WarriorsPutNextExpressController {
  @ApplyMiddleware({
    middleware: NextExpressMiddleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Put()
  public putWarrior(@next() nextFn: NextFunction): void {
    nextFn();
  }
}
