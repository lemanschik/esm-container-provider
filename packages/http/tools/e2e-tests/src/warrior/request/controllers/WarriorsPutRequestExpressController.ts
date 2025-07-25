import { Controller, Put, request } from '@inversifyjs/http-core';
import { Request } from 'express';

@Controller('/warriors')
export class WarriorsPutRequestExpressController {
  @Put()
  public async updateWarrior(
    @request() request: Request,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': request.headers['x-test-header'] as string,
    };
  }
}
