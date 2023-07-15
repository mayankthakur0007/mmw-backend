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
  LmsQuestion,
  LmsQuestionnaire,
} from '../models';
import {LmsQuestionRepository} from '../repositories';

export class LmsQuestionLmsQuestionnaireController {
  constructor(
    @repository(LmsQuestionRepository) protected lmsQuestionRepository: LmsQuestionRepository,
  ) { }

  @get('/lms-questions/{id}/lms-questionnaire', {
    responses: {
      '200': {
        description: 'LmsQuestion has one LmsQuestionnaire',
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
    return this.lmsQuestionRepository.lmsQuestionnaire(id).get(filter);
  }

  @post('/lms-questions/{id}/lms-questionnaire', {
    responses: {
      '200': {
        description: 'LmsQuestion model instance',
        content: {'application/json': {schema: getModelSchemaRef(LmsQuestionnaire)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof LmsQuestion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsQuestionnaire, {
            title: 'NewLmsQuestionnaireInLmsQuestion',
            exclude: ['id'],
            optional: ['lmsQuestionId']
          }),
        },
      },
    }) lmsQuestionnaire: Omit<LmsQuestionnaire, 'id'>,
  ): Promise<LmsQuestionnaire> {
    return this.lmsQuestionRepository.lmsQuestionnaire(id).create(lmsQuestionnaire);
  }

  @patch('/lms-questions/{id}/lms-questionnaire', {
    responses: {
      '200': {
        description: 'LmsQuestion.LmsQuestionnaire PATCH success count',
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
    return this.lmsQuestionRepository.lmsQuestionnaire(id).patch(lmsQuestionnaire, where);
  }

  @del('/lms-questions/{id}/lms-questionnaire', {
    responses: {
      '200': {
        description: 'LmsQuestion.LmsQuestionnaire DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(LmsQuestionnaire)) where?: Where<LmsQuestionnaire>,
  ): Promise<Count> {
    return this.lmsQuestionRepository.lmsQuestionnaire(id).delete(where);
  }
}
