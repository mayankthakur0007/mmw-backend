import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Messaging, MessagingRelations} from '../models';

export class MessagingRepository extends DefaultCrudRepository<
  Messaging,
  typeof Messaging.prototype.id,
  MessagingRelations
> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(Messaging, dataSource);
  }
}
