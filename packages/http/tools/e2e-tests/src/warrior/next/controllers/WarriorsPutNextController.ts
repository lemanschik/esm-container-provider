import { Controller, next, Put } from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsPutNextController {
  @Put()
  public async putWarrior(@next() nextFn: () => Promise<void>): Promise<void> {
    await nextFn();
  }
}
