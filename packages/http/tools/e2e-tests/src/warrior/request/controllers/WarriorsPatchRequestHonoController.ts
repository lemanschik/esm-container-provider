import { Controller, Patch, request } from '@inversifyjs/http-core';
import { HonoRequest } from 'hono';

@Controller('/warriors')
export class WarriorsPatchRequestHonoController {
  @Patch()
  public async patchWarrior(
    @request() request: HonoRequest,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': request.header('x-test-header') as string,
    };
  }
}
