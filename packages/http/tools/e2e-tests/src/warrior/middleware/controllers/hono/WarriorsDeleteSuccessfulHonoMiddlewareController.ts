import { applyMiddleware, Controller, Delete } from '@inversifyjs/http-core';

import { SuccessfulHonoMiddleware } from '../../middlewares/hono/SuccessfulHonoMiddleware';

@Controller('/warriors')
export class WarriorsDeleteSuccessfulHonoMiddlewareController {
  @applyMiddleware(SuccessfulHonoMiddleware)
  @Delete()
  public async deleteWarrior(): Promise<void> {}
}
