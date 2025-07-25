import {
  applyMiddleware,
  Controller,
  MiddlewarePhase,
  next,
  Post,
} from '@inversifyjs/http-core';
import { NextFunction } from 'express';

import { NextExpressMiddleware } from '../../middlewares/NextExpressMiddleware';

@Controller('/warriors')
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
