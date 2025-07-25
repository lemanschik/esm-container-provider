import { Controller, Get, useGuard } from '@inversifyjs/http-core';

import { UnsuccessfulGuard } from '../guards/UnsuccessfulGuard';

@Controller('/warriors')
export class WarriorsGetUnsuccessfulGuardController {
  @useGuard(UnsuccessfulGuard)
  @Get()
  public async getWarrior(): Promise<void> {}
}
