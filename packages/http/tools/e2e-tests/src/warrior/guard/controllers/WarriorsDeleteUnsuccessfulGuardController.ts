import { Controller, DELETE, useGuard } from '@inversifyjs/http-core';

import { UnsuccessfulGuard } from '../guards/UnsuccessfulGuard';

@Controller('/warriors')
export class WarriorsDeleteUnsuccessfulGuardController {
  @useGuard(UnsuccessfulGuard)
  @DELETE()
  public async deleteWarrior(): Promise<void> {}
}
