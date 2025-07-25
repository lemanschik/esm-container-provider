import { controller, Post, useGuard } from '@inversifyjs/http-core';

import { UnsuccessfulGuard } from '../guards/UnsuccessfulGuard';

@controller('/warriors')
export class WarriorsPostUnsuccessfulGuardController {
  @useGuard(UnsuccessfulGuard)
  @Post()
  public async postWarrior(): Promise<void> {}
}
