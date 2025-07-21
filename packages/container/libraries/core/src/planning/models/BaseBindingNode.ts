import { Binding } from '../../binding/models/Binding';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface BaseBindingNode<TBinding extends Binding<any> = Binding<any>> {
  readonly binding: TBinding;
}
