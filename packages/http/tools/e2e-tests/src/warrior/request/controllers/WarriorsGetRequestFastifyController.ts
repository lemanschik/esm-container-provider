import { Controller, Get, request } from '@inversifyjs/http-core';
import { FastifyRequest } from 'fastify';

@Controller('/warriors')
export class WarriorsGetRequestFastifyController {
  @Get()
  public async getWarrior(
    @request() request: FastifyRequest,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': request.headers['x-test-header'] as string,
    };
  }
}
