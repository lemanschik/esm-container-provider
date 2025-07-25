import { Controller, headers, Put } from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsPutHeadersNamedController {
  @Put()
  public async putWarrior(
    @headers('x-test-header') testHeader: string,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': testHeader,
    };
  }
}
