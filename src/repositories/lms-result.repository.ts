import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {LmsResult, LmsResultRelations, Users, LmsQuestionnaire, LmsQuestion} from '../models';
import {UsersRepository} from './users.repository';
import {LmsQuestionnaireRepository} from './lms-questionnaire.repository';
import {LmsQuestionRepository} from './lms-question.repository';

export class LmsResultRepository extends DefaultCrudRepository<
  LmsResult,
  typeof LmsResult.prototype._id,
  LmsResultRelations
> {

  public readonly users: HasOneRepositoryFactory<Users, typeof LmsResult.prototype.id>;

  public readonly lmsQuestionnaire: HasOneRepositoryFactory<LmsQuestionnaire, typeof LmsResult.prototype.id>;

  public readonly lmsQuestion: HasOneRepositoryFactory<LmsQuestion, typeof LmsResult.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>, @repository.getter('LmsQuestionnaireRepository') protected lmsQuestionnaireRepositoryGetter: Getter<LmsQuestionnaireRepository>, @repository.getter('LmsQuestionRepository') protected lmsQuestionRepositoryGetter: Getter<LmsQuestionRepository>,
  ) {
    super(LmsResult, dataSource);
    this.lmsQuestion = this.createHasOneRepositoryFactoryFor('lmsQuestion', lmsQuestionRepositoryGetter);
    this.registerInclusionResolver('lmsQuestion', this.lmsQuestion.inclusionResolver);
    this.lmsQuestionnaire = this.createHasOneRepositoryFactoryFor('lmsQuestionnaire', lmsQuestionnaireRepositoryGetter);
    this.registerInclusionResolver('lmsQuestionnaire', this.lmsQuestionnaire.inclusionResolver);
    this.users = this.createHasOneRepositoryFactoryFor('users', usersRepositoryGetter);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
