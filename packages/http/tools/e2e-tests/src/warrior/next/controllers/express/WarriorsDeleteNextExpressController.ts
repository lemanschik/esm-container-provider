import {
  applyMiddleware,
  Controller,
  Delete,
  MiddlewarePhase,
  next,
} from '@inversifyjs/http-core';
import { NextFunction } from 'express';

import { NextExpressMiddleware } from '../../middlewares/NextExpressMiddleware';

@Controller('/warriors')
export class WarriorsDeleteNextExpressController {
  @applyMiddleware({
    middleware: NextExpressMiddleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Delete()
  public deleteWarrior(@next() nextFn: NextFunction): void {
    nextFn();
  }
}
