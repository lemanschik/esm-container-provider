import { Controller, Options } from '@inversifyjs/http-core';
import { context } from '@inversifyjs/http-hono';
import { Context } from 'hono';

@Controller('/warriors')
export class WarriorsOptionsResponseHonoController {
  @Options()
  public async optionsWarrior(@context() context: Context): Promise<Response> {
    return context.json({
      damage: 10,
      health: 100,
      range: 1,
      speed: 10,
    });
  }
}
