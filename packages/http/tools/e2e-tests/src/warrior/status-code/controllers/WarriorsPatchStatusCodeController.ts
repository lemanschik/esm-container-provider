import {
  Controller,
  HttpStatusCode,
  PATCH,
  StatusCode,
} from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsPatchStatusCodeController {
  @StatusCode(HttpStatusCode.NO_CONTENT)
  @PATCH()
  public async patchWarrior(): Promise<void> {}
}
