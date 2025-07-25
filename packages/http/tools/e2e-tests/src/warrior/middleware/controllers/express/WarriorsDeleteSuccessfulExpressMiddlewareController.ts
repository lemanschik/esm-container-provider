import { applyMiddleware, Controller, Delete } from '@inversifyjs/http-core';

import { SuccessfulExpressMiddleware } from '../../middlewares/express/SuccessfulExpressMiddleware';

@Controller('/warriors')
export class WarriorsDeleteSuccessfulExpressMiddlewareController {
  @applyMiddleware(SuccessfulExpressMiddleware)
  @Delete()
  public async deleteWarrior(): Promise<void> {}
}
