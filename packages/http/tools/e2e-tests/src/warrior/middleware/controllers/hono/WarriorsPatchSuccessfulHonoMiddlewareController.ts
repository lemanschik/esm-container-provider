import { applyMiddleware, Controller, Patch } from '@inversifyjs/http-core';

import { SuccessfulHonoMiddleware } from '../../middlewares/hono/SuccessfulHonoMiddleware';

@Controller('/warriors')
export class WarriorsPatchSuccessfulHonoMiddlewareController {
  @applyMiddleware(SuccessfulHonoMiddleware)
  @Patch()
  public async patchWarrior(): Promise<void> {}
}
