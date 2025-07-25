import { Controller, Delete, request } from '@inversifyjs/http-core';
import { HonoRequest } from 'hono';

@Controller('/warriors')
export class WarriorsDeleteRequestHonoController {
  @Delete()
  public async deleteWarrior(
    @request() request: HonoRequest,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': request.header('x-test-header') as string,
    };
  }
}
