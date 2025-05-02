export function setReflectMetadataWithProperty(
  target: object,
  metadataKey: unknown,
  propertyKey: string | symbol,
  metadata: unknown,
): void {
  Reflect.defineMetadata(metadataKey, metadata, target, propertyKey);
}
