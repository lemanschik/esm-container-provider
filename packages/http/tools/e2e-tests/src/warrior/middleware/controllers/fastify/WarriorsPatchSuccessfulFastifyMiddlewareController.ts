import { applyMiddleware, Controller, PATCH } from '@inversifyjs/http-core';

import { SuccessfulFastifyMiddleware } from '../../middlewares/fastify/SuccessfulFastifyMiddleware';

@Controller('/warriors')
export class WarriorsPatchSuccessfulFastifyMiddlewareController {
  @applyMiddleware(SuccessfulFastifyMiddleware)
  @PATCH()
  public async patchWarrior(): Promise<void> {}
}
