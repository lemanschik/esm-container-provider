import { Controller, Put, useGuard } from '@inversifyjs/http-core';

import { UnsuccessfulGuard } from '../guards/UnsuccessfulGuard';

@Controller('/warriors')
export class WarriorsPutUnsuccessfulGuardController {
  @useGuard(UnsuccessfulGuard)
  @Put()
  public async putWarrior(): Promise<void> {}
}
