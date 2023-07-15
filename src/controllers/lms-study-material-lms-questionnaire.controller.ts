import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  LmsStudyMaterial,
  LmsQuestionnaire,
} from '../models';
import {LmsStudyMaterialRepository} from '../repositories';

export class LmsStudyMaterialLmsQuestionnaireController {
  constructor(
    @repository(LmsStudyMaterialRepository)
    public lmsStudyMaterialRepository: LmsStudyMaterialRepository,
  ) { }

  @get('/lms-study-materials/{id}/lms-questionnaire', {
    responses: {
      '200': {
        description: 'LmsQuestionnaire belonging to LmsStudyMaterial',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LmsQuestionnaire)},
          },
        },
      },
    },
  })
  async getLmsQuestionnaire(
    @param.path.string('id') id: typeof LmsStudyMaterial.prototype.id,
  ): Promise<LmsQuestionnaire> {
    return this.lmsStudyMaterialRepository.questionnaire(id);
  }
}
