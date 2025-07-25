import { Controller, Delete, request } from '@inversifyjs/http-core';
import { Request } from 'express4';

@Controller('/warriors')
export class WarriorsDeleteRequestExpressV4Controller {
  @Delete()
  public async deleteWarrior(
    @request() request: Request,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': request.headers['x-test-header'] as string,
    };
  }
}
