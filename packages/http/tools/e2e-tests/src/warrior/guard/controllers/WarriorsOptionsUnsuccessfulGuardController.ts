import { Controller, Options, useGuard } from '@inversifyjs/http-core';

import { UnsuccessfulGuard } from '../guards/UnsuccessfulGuard';

@Controller('/warriors')
export class WarriorsOptionsUnsuccessfulGuardController {
  @useGuard(UnsuccessfulGuard)
  @Options()
  public async optionsWarrior(): Promise<void> {}
}
