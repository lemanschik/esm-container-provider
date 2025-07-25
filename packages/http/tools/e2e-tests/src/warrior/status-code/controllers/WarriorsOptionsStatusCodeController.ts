import {
  Controller,
  HttpStatusCode,
  Options,
  statusCode,
} from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsOptionsStatusCodeController {
  @statusCode(HttpStatusCode.NO_CONTENT)
  @Options()
  public async optionsWarrior(): Promise<void> {}
}
