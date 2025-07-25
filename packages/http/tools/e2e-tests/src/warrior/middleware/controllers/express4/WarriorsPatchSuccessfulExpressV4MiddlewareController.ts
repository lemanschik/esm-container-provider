import { applyMiddleware, Controller, PATCH } from '@inversifyjs/http-core';

import { SuccessfulExpressV4Middleware } from '../../middlewares/express4/SuccessfulExpressV4Middleware';

@Controller('/warriors')
export class WarriorsPatchSuccessfulExpressV4MiddlewareController {
  @applyMiddleware(SuccessfulExpressV4Middleware)
  @PATCH()
  public async patchWarrior(): Promise<void> {}
}
