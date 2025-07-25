import { Controller, PATCH, UseGuard } from '@inversifyjs/http-core';

import { SuccessfulGuard } from '../guards/SuccessfulGuard';

@Controller('/warriors')
export class WarriorsPatchSuccessfulGuardController {
  @UseGuard(SuccessfulGuard)
  @PATCH()
  public async patchWarrior(): Promise<void> {}
}
