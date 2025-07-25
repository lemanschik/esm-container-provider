import { applyMiddleware, Controller, Patch } from '@inversifyjs/http-core';

import { SuccessfulExpressMiddleware } from '../../middlewares/express/SuccessfulExpressMiddleware';

@Controller('/warriors')
export class WarriorsPatchSuccessfulExpressMiddlewareController {
  @applyMiddleware(SuccessfulExpressMiddleware)
  @Patch()
  public async patchWarrior(): Promise<void> {}
}
