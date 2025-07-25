import { Controller, headers, Options } from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsOptionsHeadersController {
  @Options()
  public async optionsWarrior(
    @headers() headers: Record<string, string>,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': headers['x-test-header'] as string,
    };
  }
}
