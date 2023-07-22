import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {MessageFromManagement, MessageFromManagementRelations} from '../models';

export class MessageFromManagementRepository extends DefaultCrudRepository<
  MessageFromManagement,
  typeof MessageFromManagement.prototype.id,
  MessageFromManagementRelations
> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(MessageFromManagement, dataSource);
  }
}
