import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {InboxMessage, InboxMessageRelations, Users} from '../models';
import {UsersRepository} from './users.repository';

export class InboxMessageRepository extends DefaultCrudRepository<
  InboxMessage,
  typeof InboxMessage.prototype.id,
  InboxMessageRelations
> {

  public readonly to: BelongsToAccessor<Users, typeof InboxMessage.prototype.id>;

  public readonly from: BelongsToAccessor<Users, typeof InboxMessage.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(InboxMessage, dataSource);
    this.from = this.createBelongsToAccessorFor('from', usersRepositoryGetter,);
    this.registerInclusionResolver('from', this.from.inclusionResolver);
    this.to = this.createBelongsToAccessorFor('to', usersRepositoryGetter,);
    this.registerInclusionResolver('to', this.to.inclusionResolver);
  }
}
