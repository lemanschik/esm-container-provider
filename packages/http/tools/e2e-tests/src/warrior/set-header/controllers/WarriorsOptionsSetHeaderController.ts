import { controller, Options, setHeader } from '@inversifyjs/http-core';

@controller('/warriors')
export class WarriorsOptionsSetHeaderController {
  @setHeader('x-test-header', 'test-value')
  @Options()
  public async optionsWarrior(): Promise<void> {}
}
