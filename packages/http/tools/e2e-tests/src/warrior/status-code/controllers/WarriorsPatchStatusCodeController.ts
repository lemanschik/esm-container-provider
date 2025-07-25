import {
  Controller,
  HttpStatusCode,
  PATCH,
  statusCode,
} from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsPatchStatusCodeController {
  @statusCode(HttpStatusCode.NO_CONTENT)
  @PATCH()
  public async patchWarrior(): Promise<void> {}
}
