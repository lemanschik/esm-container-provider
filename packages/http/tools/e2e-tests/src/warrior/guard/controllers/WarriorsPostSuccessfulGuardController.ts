import { Controller, Post, useGuard } from '@inversifyjs/http-core';

import { SuccessfulGuard } from '../guards/SuccessfulGuard';

@Controller('/warriors')
export class WarriorsPostSuccessfulGuardController {
  @useGuard(SuccessfulGuard)
  @Post()
  public async postWarrior(): Promise<void> {}
}
