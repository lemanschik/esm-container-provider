import { controller, Put, setHeader } from '@inversifyjs/http-core';

@controller('/warriors')
export class WarriorsPutSetHeaderController {
  @setHeader('x-test-header', 'test-value')
  @Put()
  public async updateWarrior(): Promise<void> {}
}
