import { Controller, Get, request } from '@inversifyjs/http-core';
import { Request } from 'express';

@Controller('/warriors')
export class WarriorsGetRequestExpressController {
  @Get()
  public async getWarrior(
    @request() request: Request,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': request.headers['x-test-header'] as string,
    };
  }
}
