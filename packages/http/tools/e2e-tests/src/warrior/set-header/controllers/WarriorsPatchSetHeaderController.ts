import { Controller, PATCH, setHeader } from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsPatchSetHeaderController {
  @setHeader('x-test-header', 'test-value')
  @PATCH()
  public async patchWarrior(): Promise<void> {}
}
