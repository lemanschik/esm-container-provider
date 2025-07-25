import { controller, next, Put } from '@inversifyjs/http-core';

@controller('/warriors')
export class WarriorsPutNextController {
  @Put()
  public async putWarrior(@next() nextFn: () => Promise<void>): Promise<void> {
    await nextFn();
  }
}
