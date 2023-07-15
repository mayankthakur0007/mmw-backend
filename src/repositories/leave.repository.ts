import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Leave, LeaveRelations, Users} from '../models';
import {UsersRepository} from './users.repository';

export class LeaveRepository extends DefaultCrudRepository<
  Leave,
  typeof Leave.prototype.id,
  LeaveRelations
> {

  public readonly appliedById: BelongsToAccessor<Users, typeof Leave.prototype.id>;

  public readonly approvedByManagerId: BelongsToAccessor<Users, typeof Leave.prototype.id>;

  public readonly approvedByHRId: BelongsToAccessor<Users, typeof Leave.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Leave, dataSource);
    this.approvedByHRId = this.createBelongsToAccessorFor('approvedByHRId', usersRepositoryGetter,);
    this.approvedByManagerId = this.createBelongsToAccessorFor('approvedByManagerId', usersRepositoryGetter,);
    this.registerInclusionResolver('approvedByManagerId', this.approvedByManagerId.inclusionResolver);
    this.appliedById = this.createBelongsToAccessorFor('appliedById', usersRepositoryGetter,);
    this.registerInclusionResolver('appliedById', this.appliedById.inclusionResolver);
  }
}
