import { Controller, Put, setHeader } from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsPutSetHeaderController {
  @setHeader('x-test-header', 'test-value')
  @Put()
  public async updateWarrior(): Promise<void> {}
}
