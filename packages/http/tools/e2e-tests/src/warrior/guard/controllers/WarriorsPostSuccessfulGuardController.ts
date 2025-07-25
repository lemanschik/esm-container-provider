import { controller, Post, useGuard } from '@inversifyjs/http-core';

import { SuccessfulGuard } from '../guards/SuccessfulGuard';

@controller('/warriors')
export class WarriorsPostSuccessfulGuardController {
  @useGuard(SuccessfulGuard)
  @Post()
  public async postWarrior(): Promise<void> {}
}
