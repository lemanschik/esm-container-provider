import { Controller, Post, setHeader } from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsPostSetHeaderController {
  @setHeader('x-test-header', 'test-value')
  @Post()
  public async createWarrior(): Promise<void> {}
}
