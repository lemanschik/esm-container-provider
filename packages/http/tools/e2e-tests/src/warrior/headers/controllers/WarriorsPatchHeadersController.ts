import { Controller, headers, Patch } from '@inversifyjs/http-core';

@Controller('/warriors')
export class WarriorsPatchHeadersController {
  @Patch()
  public async patchWarrior(
    @headers() headers: Record<string, string>,
  ): Promise<Record<string, string>> {
    return {
      'x-test-header': headers['x-test-header'] as string,
    };
  }
}
