import { applyMiddleware, Controller, Delete } from '@inversifyjs/http-core';

import { SuccessfulFastifyMiddleware } from '../../middlewares/fastify/SuccessfulFastifyMiddleware';
import { UnsuccessfulFastifyMiddleware } from '../../middlewares/fastify/UnsuccessfulFastifyMiddleware';

@Controller('/warriors')
export class WarriorsDeleteUnsuccessfulFastifyMiddlewareController {
  @applyMiddleware(SuccessfulFastifyMiddleware, UnsuccessfulFastifyMiddleware)
  @Delete()
  public async deleteWarrior(): Promise<void> {}
}
