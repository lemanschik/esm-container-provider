import { Controller, Delete, headers } from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsDeleteHeadersController {
  @Delete()
  public async deleteWarrior(
    @headers() headers: Record<string, string>,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': headers['x-test-header'] as string,
    };
  }
}
