import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {LmsQuestionnaire, LmsStudymaterialAllotment, LmsStudymaterialAllotmentRelations, Users} from '../models';
import {LmsQuestionnaireRepository} from './lms-questionnaire.repository';
import {UsersRepository} from './users.repository';

export class LmsStudymaterialAllotmentRepository extends DefaultCrudRepository<
  LmsStudymaterialAllotment,
  typeof LmsStudymaterialAllotment.prototype._id,
  LmsStudymaterialAllotmentRelations
> {

  public readonly user: BelongsToAccessor<Users, typeof LmsStudymaterialAllotment.prototype.id>;

  public readonly lmsQuestionnaire: BelongsToAccessor<LmsQuestionnaire, typeof LmsStudymaterialAllotment.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>, @repository.getter('LmsQuestionnaireRepository') protected lmsQuestionnaireRepositoryGetter: Getter<LmsQuestionnaireRepository>,
  ) {
    super(LmsStudymaterialAllotment, dataSource);
    this.lmsQuestionnaire = this.createBelongsToAccessorFor('lmsQuestionnaire', lmsQuestionnaireRepositoryGetter,);
    this.registerInclusionResolver('lmsQuestionnaire', this.lmsQuestionnaire.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', usersRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
