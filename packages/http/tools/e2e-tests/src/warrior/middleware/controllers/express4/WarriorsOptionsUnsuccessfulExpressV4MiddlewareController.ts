import { applyMiddleware, Controller, Options } from '@inversifyjs/http-core';

import { SuccessfulExpressV4Middleware } from '../../middlewares/express4/SuccessfulExpressV4Middleware';
import { UnsuccessfulExpressV4Middleware } from '../../middlewares/express4/UnsuccessfulExpressV4Middleware';

@Controller('/warriors')
export class WarriorsOptionsUnsuccessfulExpressV4MiddlewareController {
  @applyMiddleware(
    SuccessfulExpressV4Middleware,
    UnsuccessfulExpressV4Middleware,
  )
  @Options()
  public async optionsWarrior(): Promise<void> {}
}
