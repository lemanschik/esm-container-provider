import { Controller, PATCH, SetHeader } from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsPatchSetHeaderController {
  @SetHeader('x-test-header', 'test-value')
  @PATCH()
  public async patchWarrior(): Promise<void> {}
}
