import { Controller, headers, Options } from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsOptionsHeadersNamedController {
  @Options()
  public async optionsWarrior(
    @headers('x-test-header') testHeader: string,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': testHeader,
    };
  }
}
