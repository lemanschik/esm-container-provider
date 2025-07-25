import { applyMiddleware, Controller, DELETE } from '@inversifyjs/http-core';

import { SuccessfulHonoMiddleware } from '../../middlewares/hono/SuccessfulHonoMiddleware';

@Controller('/warriors')
export class WarriorsDeleteSuccessfulHonoMiddlewareController {
  @applyMiddleware(SuccessfulHonoMiddleware)
  @DELETE()
  public async deleteWarrior(): Promise<void> {}
}
