import { controller, Get, headers } from '@inversifyjs/http-core';

@controller('/warriors')
export class WarriorsGetHeadersNamedController {
  @Get()
  public async getWarrior(
    @headers('x-test-header') testHeader: string,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': testHeader,
    };
  }
}
