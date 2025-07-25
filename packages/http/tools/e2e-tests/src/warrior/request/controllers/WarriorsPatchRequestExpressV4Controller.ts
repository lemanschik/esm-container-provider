import { Controller, PATCH, request } from '@inversifyjs/http-core';
import { Request } from 'express4';

@Controller('/warriors')
export class WarriorsPatchRequestExpressV4Controller {
  @PATCH()
  public async patchWarrior(
    @request() request: Request,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': request.headers['x-test-header'] as string,
    };
  }
}
