import {
  applyMiddleware,
  Controller,
  MiddlewarePhase,
  next,
  Options,
} from '@inversifyjs/http-core';
import { NextFunction } from 'express';

import { NextExpressMiddleware } from '../../middlewares/NextExpressMiddleware';

@Controller('/warriors')
export class WarriorsOptionsNextExpressController {
  @applyMiddleware({
    middleware: NextExpressMiddleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Options()
  public optionsWarrior(@next() nextFn: NextFunction): void {
    nextFn();
  }
}
