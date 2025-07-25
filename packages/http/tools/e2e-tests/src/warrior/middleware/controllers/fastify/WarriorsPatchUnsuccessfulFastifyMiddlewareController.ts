import { applyMiddleware, Controller, Patch } from '@inversifyjs/http-core';

import { SuccessfulFastifyMiddleware } from '../../middlewares/fastify/SuccessfulFastifyMiddleware';
import { UnsuccessfulFastifyMiddleware } from '../../middlewares/fastify/UnsuccessfulFastifyMiddleware';

@Controller('/warriors')
export class WarriorsPatchUnsuccessfulFastifyMiddlewareController {
  @applyMiddleware(SuccessfulFastifyMiddleware, UnsuccessfulFastifyMiddleware)
  @Patch()
  public async patchWarrior(): Promise<void> {}
}
