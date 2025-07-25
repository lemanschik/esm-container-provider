import {
  Controller,
  DELETE,
  HttpStatusCode,
  StatusCode,
} from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsDeleteStatusCodeController {
  @StatusCode(HttpStatusCode.NO_CONTENT)
  @DELETE()
  public async deleteWarrior(): Promise<void> {}
}
