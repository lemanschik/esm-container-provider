import { Controller, Put, request } from '@inversifyjs/http-core';
import { FastifyRequest } from 'fastify';

@Controller('/warriors')
export class WarriorsPutRequestFastifyController {
  @Put()
  public async updateWarrior(
    @request() request: FastifyRequest,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': request.headers['x-test-header'] as string,
    };
  }
}
