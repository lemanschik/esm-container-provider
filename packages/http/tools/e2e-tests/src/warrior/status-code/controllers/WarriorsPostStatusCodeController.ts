import {
  Controller,
  HttpStatusCode,
  Post,
  statusCode,
} from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsPostStatusCodeController {
  @statusCode(HttpStatusCode.NO_CONTENT)
  @Post()
  public async postWarrior(): Promise<void> {}
}
