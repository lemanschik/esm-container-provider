import {
  Controller,
  DELETE,
  HttpStatusCode,
  statusCode,
} from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsDeleteStatusCodeController {
  @statusCode(HttpStatusCode.NO_CONTENT)
  @DELETE()
  public async deleteWarrior(): Promise<void> {}
}
