import { controller, Put, useGuard } from '@inversifyjs/http-core';

import { SuccessfulGuard } from '../guards/SuccessfulGuard';

@controller('/warriors')
export class WarriorsPutSuccessfulGuardController {
  @useGuard(SuccessfulGuard)
  @Put()
  public async putWarrior(): Promise<void> {}
}
