import { controller, Options, useGuard } from '@inversifyjs/http-core';

import { UnsuccessfulGuard } from '../guards/UnsuccessfulGuard';

@controller('/warriors')
export class WarriorsOptionsUnsuccessfulGuardController {
  @useGuard(UnsuccessfulGuard)
  @Options()
  public async optionsWarrior(): Promise<void> {}
}
