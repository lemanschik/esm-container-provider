import { applyMiddleware, Controller, Delete } from '@inversifyjs/http-core';

import { SuccessfulExpressMiddleware } from '../../middlewares/express/SuccessfulExpressMiddleware';
import { UnsuccessfulExpressMiddleware } from '../../middlewares/express/UnsuccessfulExpressMiddleware';

@Controller('/warriors')
export class WarriorsDeleteUnsuccessfulExpressMiddlewareController {
  @applyMiddleware(SuccessfulExpressMiddleware, UnsuccessfulExpressMiddleware)
  @Delete()
  public async deleteWarrior(): Promise<void> {}
}
