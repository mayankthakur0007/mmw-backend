import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  LmsStudymaterialAllotment,
  LmsQuestionnaire,
} from '../models';
import {LmsStudymaterialAllotmentRepository} from '../repositories';

export class LmsStudymaterialAllotmentLmsQuestionnaireController {
  constructor(
    @repository(LmsStudymaterialAllotmentRepository)
    public lmsStudymaterialAllotmentRepository: LmsStudymaterialAllotmentRepository,
  ) { }

  @get('/lms-studymaterial-allotments/{id}/lms-questionnaire', {
    responses: {
      '200': {
        description: 'LmsQuestionnaire belonging to LmsStudymaterialAllotment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(LmsQuestionnaire)},
          },
        },
      },
    },
  })
  async getLmsQuestionnaire(
    @param.path.string('id') id: typeof LmsStudymaterialAllotment.prototype.id,
  ): Promise<LmsQuestionnaire> {
    return this.lmsStudymaterialAllotmentRepository.lmsQuestionnaire(id);
  }
}
