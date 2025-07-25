import { applyMiddleware, Controller, Patch } from '@inversifyjs/http-core';

import { SuccessfulExpressMiddleware } from '../../middlewares/express/SuccessfulExpressMiddleware';
import { UnsuccessfulExpressMiddleware } from '../../middlewares/express/UnsuccessfulExpressMiddleware';

@Controller('/warriors')
export class WarriorsPatchUnsuccessfulExpressMiddlewareController {
  @applyMiddleware(SuccessfulExpressMiddleware, UnsuccessfulExpressMiddleware)
  @Patch()
  public async patchWarrior(): Promise<void> {}
}
