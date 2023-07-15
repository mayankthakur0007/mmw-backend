import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  LmsResult,
  LmsQuestionnaire,
} from '../models';
import {LmsResultRepository} from '../repositories';

export class LmsResultLmsQuestionnaireController {
  constructor(
    @repository(LmsResultRepository) protected lmsResultRepository: LmsResultRepository,
  ) { }

  @get('/lms-results/{id}/lms-questionnaire', {
    responses: {
      '200': {
        description: 'LmsResult has one LmsQuestionnaire',
        content: {
          'application/json': {
            schema: getModelSchemaRef(LmsQuestionnaire),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<LmsQuestionnaire>,
  ): Promise<LmsQuestionnaire> {
    return this.lmsResultRepository.lmsQuestionnaire(id).get(filter);
  }

  @post('/lms-results/{id}/lms-questionnaire', {
    responses: {
      '200': {
        description: 'LmsResult model instance',
        content: {'application/json': {schema: getModelSchemaRef(LmsQuestionnaire)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof LmsResult.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsQuestionnaire, {
            title: 'NewLmsQuestionnaireInLmsResult',
            exclude: ['id'],
            optional: ['lmsResultId']
          }),
        },
      },
    }) lmsQuestionnaire: Omit<LmsQuestionnaire, 'id'>,
  ): Promise<LmsQuestionnaire> {
    return this.lmsResultRepository.lmsQuestionnaire(id).create(lmsQuestionnaire);
  }

  @patch('/lms-results/{id}/lms-questionnaire', {
    responses: {
      '200': {
        description: 'LmsResult.LmsQuestionnaire PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsQuestionnaire, {partial: true}),
        },
      },
    })
    lmsQuestionnaire: Partial<LmsQuestionnaire>,
    @param.query.object('where', getWhereSchemaFor(LmsQuestionnaire)) where?: Where<LmsQuestionnaire>,
  ): Promise<Count> {
    return this.lmsResultRepository.lmsQuestionnaire(id).patch(lmsQuestionnaire, where);
  }

  @del('/lms-results/{id}/lms-questionnaire', {
    responses: {
      '200': {
        description: 'LmsResult.LmsQuestionnaire DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(LmsQuestionnaire)) where?: Where<LmsQuestionnaire>,
  ): Promise<Count> {
    return this.lmsResultRepository.lmsQuestionnaire(id).delete(where);
  }
}
