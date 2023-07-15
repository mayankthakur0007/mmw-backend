import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Branch, Designation, Users, UsersCredentials, UsersRelations} from '../models';
import {BranchRepository} from './branch.repository';
import {DesignationRepository} from './designation.repository';
import {UsersCredentialsRepository} from './users-credentials.repository';

export type Credentials = {
  civil_id: string;
  password: string;
};

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
  > {

  public readonly usersCredentials: HasOneRepositoryFactory<UsersCredentials, typeof Users.prototype.id>;

  public readonly branch: BelongsToAccessor<Branch, typeof Users.prototype.id>;

  public readonly designation: BelongsToAccessor<Designation, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('BranchRepository') protected branchRepositoryGetter: Getter<BranchRepository>,
    @repository.getter('DesignationRepository') protected designationRepositoryGetter: Getter<DesignationRepository>,
    @repository.getter('UsersCredentialsRepository')
    protected usersCredentialsRepositoryGetter: Getter<UsersCredentialsRepository>,
  ) {
    super(Users, dataSource);
    this.designation = this.createBelongsToAccessorFor('designation', designationRepositoryGetter,);
    this.registerInclusionResolver('designation', this.designation.inclusionResolver);
    this.branch = this.createBelongsToAccessorFor('branch', branchRepositoryGetter,);
    this.registerInclusionResolver('branch', this.branch.inclusionResolver);
    this.usersCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      usersCredentialsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'userCredentials',
      this.usersCredentials.inclusionResolver,
    );
  }

  async findCredentials(
    userId: typeof Users.prototype.id,
  ): Promise<UsersCredentials | undefined> {
    try {
      return await this.usersCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
