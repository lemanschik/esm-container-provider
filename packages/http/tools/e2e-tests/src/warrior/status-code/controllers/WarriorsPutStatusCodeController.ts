import {
  Controller,
  HttpStatusCode,
  Put,
  statusCode,
} from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsPutStatusCodeController {
  @statusCode(HttpStatusCode.NO_CONTENT)
  @Put()
  public async putWarrior(): Promise<void> {}
}
