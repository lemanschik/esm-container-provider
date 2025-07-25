import {
  Controller,
  Get,
  HttpStatusCode,
  statusCode,
} from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsGetStatusCodeController {
  @statusCode(HttpStatusCode.NO_CONTENT)
  @Get()
  public async getWarrior(): Promise<void> {}
}
