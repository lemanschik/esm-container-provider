import { Controller, Delete, headers } from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsDeleteHeadersNamedController {
  @Delete()
  public async deleteWarrior(
    @headers('x-test-header') testHeader: string,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': testHeader,
    };
  }
}
