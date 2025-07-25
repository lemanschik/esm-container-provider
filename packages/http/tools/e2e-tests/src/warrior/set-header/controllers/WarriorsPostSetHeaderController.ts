import { controller, Post, setHeader } from '@inversifyjs/http-core';

@controller('/warriors')
export class WarriorsPostSetHeaderController {
  @setHeader('x-test-header', 'test-value')
  @Post()
  public async createWarrior(): Promise<void> {}
}
