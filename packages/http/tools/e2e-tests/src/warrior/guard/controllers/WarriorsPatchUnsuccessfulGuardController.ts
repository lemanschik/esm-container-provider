import { Controller, PATCH, UseGuard } from '@inversifyjs/http-core';

import { UnsuccessfulGuard } from '../guards/UnsuccessfulGuard';

@Controller('/warriors')
export class WarriorsPatchUnsuccessfulGuardController {
  @UseGuard(UnsuccessfulGuard)
  @PATCH()
  public async patchWarrior(): Promise<void> {}
}
