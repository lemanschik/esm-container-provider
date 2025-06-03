import { HttpAdapterOptions } from '@inversifyjs/http-core';

export interface ExpressHttpAdapterOptions extends HttpAdapterOptions {
  useJson?: boolean;
}
