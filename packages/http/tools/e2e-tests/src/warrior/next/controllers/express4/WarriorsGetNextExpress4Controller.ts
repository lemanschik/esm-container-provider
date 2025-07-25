import {
  ApplyMiddleware,
  Controller,
  Get,
  MiddlewarePhase,
  next,
} from '@inversifyjs/http-core';
import { NextFunction } from 'express4';

import { NextExpress4Middleware } from '../../middlewares/NextExpress4Middleware';

@Controller('/warriors')
export class WarriorsGetNextExpress4Controller {
  @ApplyMiddleware({
    middleware: NextExpress4Middleware,
    phase: MiddlewarePhase.PostHandler,
  })
  @Get()
  public getWarrior(@next() nextFn: NextFunction): void {
    nextFn();
  }
}
