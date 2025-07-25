import { Controller, Put, useGuard } from '@inversifyjs/http-core';

import { SuccessfulGuard } from '../guards/SuccessfulGuard';

@Controller('/warriors')
export class WarriorsPutSuccessfulGuardController {
  @useGuard(SuccessfulGuard)
  @Put()
  public async putWarrior(): Promise<void> {}
}
