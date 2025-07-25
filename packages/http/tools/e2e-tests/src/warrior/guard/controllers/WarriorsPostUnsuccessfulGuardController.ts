import { Controller, Post, useGuard } from '@inversifyjs/http-core';

import { UnsuccessfulGuard } from '../guards/UnsuccessfulGuard';

@Controller('/warriors')
export class WarriorsPostUnsuccessfulGuardController {
  @useGuard(UnsuccessfulGuard)
  @Post()
  public async postWarrior(): Promise<void> {}
}
