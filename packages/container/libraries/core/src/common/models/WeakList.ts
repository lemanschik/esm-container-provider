const DEFAULT_MINIMUM_LENGTH_TO_REALLOCATE: number = 8;
const DEFAULT_MODULUS_TO_REALLOCATE_ON_PUSH: number = 1024;
const MIN_DEAD_REFS_FOR_REALLOCATION_PERCENTAGE: number = 0.5;

/**
 * A list-like collection that holds weak references to objects.
 * Automatically cleans up dead references when a threshold is met.
 *
 * FinalizationRegistry is not used here due to it's lack of determinism.
 * FinalizationRegsitry callbacks are not guaranteed to be called after an object is garbage collected.
 */
export class WeakList<T extends object> implements Iterable<T> {
  #list: WeakRef<T>[];

  readonly #minimumLengthToReallocate: number;
  readonly #modulusToReallocateOnPush: number;

  constructor() {
    this.#list = [];
    this.#minimumLengthToReallocate = DEFAULT_MINIMUM_LENGTH_TO_REALLOCATE;
    this.#modulusToReallocateOnPush = DEFAULT_MODULUS_TO_REALLOCATE_ON_PUSH;
  }

  public *[Symbol.iterator](): Iterator<T> {
    let deadRefCount: number = 0;

    for (const weakRef of this.#list) {
      const value: T | undefined = weakRef.deref();

      if (value === undefined) {
        ++deadRefCount;
      } else {
        yield value;
      }
    }

    if (
      this.#list.length >= this.#minimumLengthToReallocate &&
      this.#shouldReallocate(deadRefCount)
    ) {
      this.#reallocate(deadRefCount);
    }
  }

  public push(value: T): void {
    const weakRef: WeakRef<T> = new WeakRef<T>(value);
    this.#list.push(weakRef);

    if (
      this.#list.length >= this.#minimumLengthToReallocate &&
      this.#list.length % this.#modulusToReallocateOnPush === 0
    ) {
      let deadRefCount: number = 0;

      for (const ref of this.#list) {
        if (ref.deref() === undefined) {
          ++deadRefCount;
        }
      }

      if (this.#shouldReallocate(deadRefCount)) {
        this.#reallocate(deadRefCount);
      }
    }
  }

  #reallocate(deadRefCount: number): void {
    const newList: WeakRef<T>[] = new Array<WeakRef<T>>(
      this.#list.length - deadRefCount,
    );

    let i: number = 0;
    for (const ref of this.#list) {
      if (ref.deref()) {
        newList[i++] = ref;
      }
    }
    this.#list = newList;
  }

  #shouldReallocate(deadRefCount: number): boolean {
    return (
      deadRefCount >=
      this.#list.length * MIN_DEAD_REFS_FOR_REALLOCATION_PERCENTAGE
    );
  }
}
