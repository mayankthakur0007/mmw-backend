import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Designation, DesignationRelations} from '../models';

export class DesignationRepository extends DefaultCrudRepository<
  Designation,
  typeof Designation.prototype.id,
  DesignationRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Designation, dataSource);
  }
}
