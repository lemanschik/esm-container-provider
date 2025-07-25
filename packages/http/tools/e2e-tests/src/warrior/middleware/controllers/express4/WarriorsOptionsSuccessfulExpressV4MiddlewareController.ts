import { applyMiddleware, Controller, Options } from '@inversifyjs/http-core';

import { SuccessfulExpressV4Middleware } from '../../middlewares/express4/SuccessfulExpressV4Middleware';

@Controller('/warriors')
export class WarriorsOptionsSuccessfulExpressV4MiddlewareController {
  @applyMiddleware(SuccessfulExpressV4Middleware)
  @Options()
  public async optionsWarrior(): Promise<void> {}
}
