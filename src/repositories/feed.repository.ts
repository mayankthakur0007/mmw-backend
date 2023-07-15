import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Feed, FeedRelations, Users} from '../models';
import {UsersRepository} from './users.repository';

export class FeedRepository extends DefaultCrudRepository<
  Feed,
  typeof Feed.prototype.id,
  FeedRelations
> {

  public readonly createdByID: BelongsToAccessor<Users, typeof Feed.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Feed, dataSource);
    this.createdByID = this.createBelongsToAccessorFor('createdByID', usersRepositoryGetter,);
    this.registerInclusionResolver('createdByID', this.createdByID.inclusionResolver);
  }
}
