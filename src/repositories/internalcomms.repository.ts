import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {InternalComms, InternalCommsRelations} from '../models';

export class InternalCommsRepository extends DefaultCrudRepository<
  InternalComms,
  typeof InternalComms.prototype.id,
  InternalCommsRelations
> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(InternalComms, dataSource);
  }
}
