import {
  controller,
  HttpStatusCode,
  Put,
  statusCode,
} from '@inversifyjs/http-core';

@controller('/warriors')
export class WarriorsPutStatusCodeController {
  @statusCode(HttpStatusCode.NO_CONTENT)
  @Put()
  public async putWarrior(): Promise<void> {}
}
