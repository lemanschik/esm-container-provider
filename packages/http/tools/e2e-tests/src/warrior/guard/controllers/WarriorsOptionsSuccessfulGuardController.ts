import { controller, Options, useGuard } from '@inversifyjs/http-core';

import { SuccessfulGuard } from '../guards/SuccessfulGuard';

@controller('/warriors')
export class WarriorsOptionsSuccessfulGuardController {
  @useGuard(SuccessfulGuard)
  @Options()
  public async optionsWarrior(): Promise<void> {}
}
