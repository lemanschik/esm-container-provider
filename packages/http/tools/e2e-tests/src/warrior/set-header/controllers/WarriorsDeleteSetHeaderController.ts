import { Controller, DELETE, SetHeader } from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsDeleteSetHeaderController {
  @SetHeader('x-test-header', 'test-value')
  @DELETE()
  public async deleteWarrior(): Promise<void> {}
}
