import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {UsersCredentials, UsersCredentialsRelations} from '../models';

export class UsersCredentialsRepository extends DefaultCrudRepository<
  UsersCredentials,
  typeof UsersCredentials.prototype.id,
  UsersCredentialsRelations
> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(UsersCredentials, dataSource);
  }
}
