import { AdminRepositoryFactory } from '@s4y/external/ngfire/admin-data';
import { DbFactory, Logger, getLogger } from '@s4y/external/iote/cqrs';

export abstract class NestService
{
  protected _repoFactory: DbFactory;
  protected _logger: Logger;

  constructor()
  {
    this._repoFactory = AdminRepositoryFactory;
    this._logger = getLogger({ production: false });
  }

}
