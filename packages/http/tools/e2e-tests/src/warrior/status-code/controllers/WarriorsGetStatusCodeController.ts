import {
  controller,
  Get,
  HttpStatusCode,
  statusCode,
} from '@inversifyjs/http-core';

@controller('/warriors')
export class WarriorsGetStatusCodeController {
  @statusCode(HttpStatusCode.NO_CONTENT)
  @Get()
  public async getWarrior(): Promise<void> {}
}
