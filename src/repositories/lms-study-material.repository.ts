import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, ReferencesManyAccessor, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {LmsCategory, LmsStudyMaterial, LmsStudyMaterialRelations, Media, LmsQuestionnaire} from '../models';
import {LmsCategoryRepository} from './lms-category.repository';
import {LmsQuestionnaireRepository} from './lms-questionnaire.repository';
import {MediaRepository} from './media.repository';

export class LmsStudyMaterialRepository extends DefaultCrudRepository<
  LmsStudyMaterial,
  typeof LmsStudyMaterial.prototype.id,
  LmsStudyMaterialRelations
> {
  public readonly media: ReferencesManyAccessor<Media, typeof LmsStudyMaterial.prototype.id>;
  public readonly category: ReferencesManyAccessor<LmsCategory, typeof LmsStudyMaterial.prototype.id>;

  public readonly questionnaire: BelongsToAccessor<LmsQuestionnaire, typeof LmsStudyMaterial.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('LmsCategoryRepository') protected lmsCategoryRepositoryGetter: Getter<LmsCategoryRepository>, @repository.getter('LmsQuestionnaireRepository') protected lmsQuestionnaireRepositoryGetter: Getter<LmsQuestionnaireRepository>, @repository.getter('MediaRepository') protected mediaRepositoryGetter: Getter<MediaRepository>,
  ) {
    super(LmsStudyMaterial, dataSource);
    this.questionnaire = this.createBelongsToAccessorFor('questionnaire', lmsQuestionnaireRepositoryGetter,);
    this.registerInclusionResolver('questionnaire', this.questionnaire.inclusionResolver);
    this.category = this.createReferencesManyAccessorFor('category', lmsCategoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
    this.media = this.createReferencesManyAccessorFor('media', mediaRepositoryGetter,);
    this.registerInclusionResolver('media', this.media.inclusionResolver);
  }
}
