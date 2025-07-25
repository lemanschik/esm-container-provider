import { controller, Get, headers } from '@inversifyjs/http-core';

@controller('/warriors')
export class WarriorsGetHeadersController {
  @Get()
  public async getWarrior(
    @headers() headers: Record<string, string>,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': headers['x-test-header'] as string,
    };
  }
}
