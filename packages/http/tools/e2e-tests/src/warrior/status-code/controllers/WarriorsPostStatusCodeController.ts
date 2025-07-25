import {
  controller,
  HttpStatusCode,
  Post,
  statusCode,
} from '@inversifyjs/http-core';

@controller('/warriors')
export class WarriorsPostStatusCodeController {
  @statusCode(HttpStatusCode.NO_CONTENT)
  @Post()
  public async postWarrior(): Promise<void> {}
}
