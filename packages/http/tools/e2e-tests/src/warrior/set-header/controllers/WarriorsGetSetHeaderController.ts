import { Controller, Get, setHeader } from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsGetSetHeaderController {
  @setHeader('x-test-header', 'test-value')
  @Get()
  public async getWarrior(): Promise<void> {}
}
