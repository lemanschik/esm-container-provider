import { Controller, DELETE, headers } from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsDeleteHeadersController {
  @DELETE()
  public async deleteWarrior(
    @headers() headers: Record<string, string>,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': headers['x-test-header'] as string,
    };
  }
}
