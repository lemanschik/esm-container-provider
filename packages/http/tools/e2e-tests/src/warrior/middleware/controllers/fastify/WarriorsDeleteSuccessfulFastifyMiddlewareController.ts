import { applyMiddleware, Controller, Delete } from '@inversifyjs/http-core';

import { SuccessfulFastifyMiddleware } from '../../middlewares/fastify/SuccessfulFastifyMiddleware';

@Controller('/warriors')
export class WarriorsDeleteSuccessfulFastifyMiddlewareController {
  @applyMiddleware(SuccessfulFastifyMiddleware)
  @Delete()
  public async deleteWarrior(): Promise<void> {}
}
