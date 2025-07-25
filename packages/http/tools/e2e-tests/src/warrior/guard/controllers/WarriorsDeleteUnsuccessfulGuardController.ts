import { Controller, DELETE, UseGuard } from '@inversifyjs/http-core';

import { UnsuccessfulGuard } from '../guards/UnsuccessfulGuard';

@Controller('/warriors')
export class WarriorsDeleteUnsuccessfulGuardController {
  @UseGuard(UnsuccessfulGuard)
  @DELETE()
  public async deleteWarrior(): Promise<void> {}
}
