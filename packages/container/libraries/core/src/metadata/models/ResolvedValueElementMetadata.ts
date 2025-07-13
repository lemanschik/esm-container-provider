import { MultipleInjectionResolvedValueElementMetadata } from './MultipleInjectionResolvedValueElementMetadata';
import { SingleInjectionResolvedValueElementMetadata } from './SingleInjectionResolvedValueElementMetadata';

export type ResolvedValueElementMetadata =
  | SingleInjectionResolvedValueElementMetadata
  | MultipleInjectionResolvedValueElementMetadata;
