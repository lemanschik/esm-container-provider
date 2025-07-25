import { controller, Get, setHeader } from '@inversifyjs/http-core';

@controller('/warriors')
export class WarriorsGetSetHeaderController {
  @setHeader('x-test-header', 'test-value')
  @Get()
  public async getWarrior(): Promise<void> {}
}
