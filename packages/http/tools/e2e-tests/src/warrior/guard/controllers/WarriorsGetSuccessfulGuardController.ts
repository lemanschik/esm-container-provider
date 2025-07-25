import { controller, Get, useGuard } from '@inversifyjs/http-core';

import { SuccessfulGuard } from '../guards/SuccessfulGuard';

@controller('/warriors')
export class WarriorsGetSuccessfulGuardController {
  @useGuard(SuccessfulGuard)
  @Get()
  public async getWarrior(): Promise<void> {}
}
