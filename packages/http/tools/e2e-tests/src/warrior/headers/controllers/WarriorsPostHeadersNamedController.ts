import { controller, headers, Post } from '@inversifyjs/http-core';

@controller('/warriors')
export class WarriorsPostHeadersNamedController {
  @Post()
  public async postWarrior(
    @headers('x-test-header') testHeader: string,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': testHeader,
    };
  }
}
