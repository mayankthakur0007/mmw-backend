import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {LmsCategory, LmsCategoryRelations} from '../models';

export class LmsCategoryRepository extends DefaultCrudRepository<
  LmsCategory,
  typeof LmsCategory.prototype._id,
  LmsCategoryRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(LmsCategory, dataSource);
  }
}
