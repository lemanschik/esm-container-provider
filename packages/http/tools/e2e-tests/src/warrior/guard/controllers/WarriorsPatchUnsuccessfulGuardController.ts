import { Controller, PATCH, useGuard } from '@inversifyjs/http-core';

import { UnsuccessfulGuard } from '../guards/UnsuccessfulGuard';

@Controller('/warriors')
export class WarriorsPatchUnsuccessfulGuardController {
  @useGuard(UnsuccessfulGuard)
  @PATCH()
  public async patchWarrior(): Promise<void> {}
}
