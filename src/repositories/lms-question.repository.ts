import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {LmsQuestion, LmsQuestionRelations, LmsQuestionnaire} from '../models';
import {LmsQuestionnaireRepository} from './lms-questionnaire.repository';

export class LmsQuestionRepository extends DefaultCrudRepository<
  LmsQuestion,
  typeof LmsQuestion.prototype._id,
  LmsQuestionRelations
> {

  public readonly lmsQuestionnaire: HasOneRepositoryFactory<LmsQuestionnaire, typeof LmsQuestion.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('LmsQuestionnaireRepository') protected lmsQuestionnaireRepositoryGetter: Getter<LmsQuestionnaireRepository>,
  ) {
    super(LmsQuestion, dataSource);
    this.lmsQuestionnaire = this.createHasOneRepositoryFactoryFor('lmsQuestionnaire', lmsQuestionnaireRepositoryGetter);
    this.registerInclusionResolver('lmsQuestionnaire', this.lmsQuestionnaire.inclusionResolver);
  }
}
