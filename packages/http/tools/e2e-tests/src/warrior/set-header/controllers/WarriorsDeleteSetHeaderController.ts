import { Controller, DELETE, setHeader } from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsDeleteSetHeaderController {
  @setHeader('x-test-header', 'test-value')
  @DELETE()
  public async deleteWarrior(): Promise<void> {}
}
