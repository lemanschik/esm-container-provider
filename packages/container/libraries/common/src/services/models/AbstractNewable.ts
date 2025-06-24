export type AbstractNewable<
  TInstance = unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TArgs extends unknown[] = any[],
> = abstract new (...args: TArgs) => TInstance;
