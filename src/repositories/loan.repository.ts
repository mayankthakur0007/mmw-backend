import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Loan, LoanRelations, Users} from '../models';
import {UsersRepository} from './users.repository';

export class LoanRepository extends DefaultCrudRepository<
  Loan,
  typeof Loan.prototype.id,
  LoanRelations
> {

  public readonly LoanUser: BelongsToAccessor<Users, typeof Loan.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Loan, dataSource);
    this.LoanUser = this.createBelongsToAccessorFor('LoanUser', usersRepositoryGetter,);
    this.registerInclusionResolver('LoanUser', this.LoanUser.inclusionResolver);
  }
}
