import { Controller, PATCH, useGuard } from '@inversifyjs/http-core';

import { SuccessfulGuard } from '../guards/SuccessfulGuard';

@Controller('/warriors')
export class WarriorsPatchSuccessfulGuardController {
  @useGuard(SuccessfulGuard)
  @PATCH()
  public async patchWarrior(): Promise<void> {}
}
