import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {MoM, MoMRelations} from '../models';

export class MoMRepository extends DefaultCrudRepository<
  MoM,
  typeof MoM.prototype.id,
  MoMRelations
> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(MoM, dataSource);
  }
}
