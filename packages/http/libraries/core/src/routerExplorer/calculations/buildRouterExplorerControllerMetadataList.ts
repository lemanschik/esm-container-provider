import { Container } from 'inversify';

import { InversifyHttpAdapterError } from '../../error/models/InversifyHttpAdapterError';
import { InversifyHttpAdapterErrorKind } from '../../error/models/InversifyHttpAdapterErrorKind';
import { ControllerMetadata } from '../model/ControllerMetadata';
import { RouterExplorerControllerMetadata } from '../model/RouterExplorerControllerMetadata';
import { buildRouterExplorerControllerMetadata } from './buildRouterExplorerControllerMetadata';
import { exploreControllers } from './exploreControllers';

export function buildRouterExplorerControllerMetadataList(
  container: Container,
): RouterExplorerControllerMetadata[] {
  const controllerMetadataList: ControllerMetadata[] | undefined =
    exploreControllers();

  if (controllerMetadataList === undefined) {
    throw new InversifyHttpAdapterError(
      InversifyHttpAdapterErrorKind.noControllerFound,
    );
  }

  const routerExplorerControllerMetadataList: RouterExplorerControllerMetadata[] =
    [];

  for (const controllerMetadata of controllerMetadataList) {
    if (container.isBound(controllerMetadata.target)) {
      routerExplorerControllerMetadataList.push(
        buildRouterExplorerControllerMetadata(controllerMetadata),
      );
    }
  }

  return routerExplorerControllerMetadataList;
}
