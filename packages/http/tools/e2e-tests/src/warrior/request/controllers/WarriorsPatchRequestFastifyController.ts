import { Controller, Patch, request } from '@inversifyjs/http-core';
import { FastifyRequest } from 'fastify';

@Controller('/warriors')
export class WarriorsPatchRequestFastifyController {
  @Patch()
  public async patchWarrior(
    @request() request: FastifyRequest,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': request.headers['x-test-header'] as string,
    };
  }
}
