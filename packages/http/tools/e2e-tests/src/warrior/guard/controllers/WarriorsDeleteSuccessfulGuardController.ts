import { Controller, DELETE, UseGuard } from '@inversifyjs/http-core';

import { SuccessfulGuard } from '../guards/SuccessfulGuard';

@Controller('/warriors')
export class WarriorsDeleteSuccessfulGuardController {
  @UseGuard(SuccessfulGuard)
  @DELETE()
  public async deleteWarrior(): Promise<void> {}
}
