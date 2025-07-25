import { applyMiddleware, Controller, DELETE } from '@inversifyjs/http-core';

import { SuccessfulExpressMiddleware } from '../../middlewares/express/SuccessfulExpressMiddleware';

@Controller('/warriors')
export class WarriorsDeleteSuccessfulExpressMiddlewareController {
  @applyMiddleware(SuccessfulExpressMiddleware)
  @DELETE()
  public async deleteWarrior(): Promise<void> {}
}
