import { Controller, Post, request } from '@inversifyjs/http-core';
import { Request } from 'express4';

@Controller('/warriors')
export class WarriorsPostRequestExpressV4Controller {
  @Post()
  public async createWarrior(
    @request() request: Request,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': request.headers['x-test-header'] as string,
    };
  }
}
