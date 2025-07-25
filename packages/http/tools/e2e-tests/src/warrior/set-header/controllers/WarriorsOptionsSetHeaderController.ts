import { Controller, Options, setHeader } from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsOptionsSetHeaderController {
  @setHeader('x-test-header', 'test-value')
  @Options()
  public async optionsWarrior(): Promise<void> {}
}
