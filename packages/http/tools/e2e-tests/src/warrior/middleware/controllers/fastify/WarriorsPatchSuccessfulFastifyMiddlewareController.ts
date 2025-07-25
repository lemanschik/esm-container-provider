import { applyMiddleware, Controller, Patch } from '@inversifyjs/http-core';

import { SuccessfulFastifyMiddleware } from '../../middlewares/fastify/SuccessfulFastifyMiddleware';

@Controller('/warriors')
export class WarriorsPatchSuccessfulFastifyMiddlewareController {
  @applyMiddleware(SuccessfulFastifyMiddleware)
  @Patch()
  public async patchWarrior(): Promise<void> {}
}
