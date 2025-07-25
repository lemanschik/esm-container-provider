import { Controller, DELETE, headers } from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsDeleteHeadersNamedController {
  @DELETE()
  public async deleteWarrior(
    @headers('x-test-header') testHeader: string,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': testHeader,
    };
  }
}
