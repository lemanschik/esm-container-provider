import { controller, Get } from '@inversifyjs/http-core';

@controller()
export class AppController {
  @Get()
  public ok(): string {
    return 'ok';
  }
}
