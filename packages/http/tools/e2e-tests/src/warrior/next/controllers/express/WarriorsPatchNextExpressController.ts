import {
  ApplyMiddleware,
  Controller,
  MiddlewarePhase,
  next,
  Patch,
} from '@inversifyjs/http-core';
import { NextFunction } from 'express';

import { NextExpressMiddleware } from '../../middlewares/NextExpressMiddleware';

@Controller('/warriors')
export class WarriorsPatchNextExpressController {
  @ApplyMiddleware({
    middleware: NextExpressMiddleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Patch()
  public patchWarrior(@next() nextFn: NextFunction): void {
    nextFn();
  }
}
