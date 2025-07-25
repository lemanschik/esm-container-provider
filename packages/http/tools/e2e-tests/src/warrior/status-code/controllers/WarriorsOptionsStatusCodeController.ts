import {
  controller,
  HttpStatusCode,
  Options,
  statusCode,
} from '@inversifyjs/http-core';

@controller('/warriors')
export class WarriorsOptionsStatusCodeController {
  @statusCode(HttpStatusCode.NO_CONTENT)
  @Options()
  public async optionsWarrior(): Promise<void> {}
}
