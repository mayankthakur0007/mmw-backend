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
  LmsQuestion,
} from '../models';
import {LmsResultRepository} from '../repositories';

export class LmsResultLmsQuestionController {
  constructor(
    @repository(LmsResultRepository) protected lmsResultRepository: LmsResultRepository,
  ) { }

  @get('/lms-results/{id}/lms-question', {
    responses: {
      '200': {
        description: 'LmsResult has one LmsQuestion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(LmsQuestion),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<LmsQuestion>,
  ): Promise<LmsQuestion> {
    return this.lmsResultRepository.lmsQuestion(id).get(filter);
  }

  @post('/lms-results/{id}/lms-question', {
    responses: {
      '200': {
        description: 'LmsResult model instance',
        content: {'application/json': {schema: getModelSchemaRef(LmsQuestion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof LmsResult.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsQuestion, {
            title: 'NewLmsQuestionInLmsResult',
            exclude: ['id'],
            optional: ['lmsResultId']
          }),
        },
      },
    }) lmsQuestion: Omit<LmsQuestion, 'id'>,
  ): Promise<LmsQuestion> {
    return this.lmsResultRepository.lmsQuestion(id).create(lmsQuestion);
  }

  @patch('/lms-results/{id}/lms-question', {
    responses: {
      '200': {
        description: 'LmsResult.LmsQuestion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsQuestion, {partial: true}),
        },
      },
    })
    lmsQuestion: Partial<LmsQuestion>,
    @param.query.object('where', getWhereSchemaFor(LmsQuestion)) where?: Where<LmsQuestion>,
  ): Promise<Count> {
    return this.lmsResultRepository.lmsQuestion(id).patch(lmsQuestion, where);
  }

  @del('/lms-results/{id}/lms-question', {
    responses: {
      '200': {
        description: 'LmsResult.LmsQuestion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(LmsQuestion)) where?: Where<LmsQuestion>,
  ): Promise<Count> {
    return this.lmsResultRepository.lmsQuestion(id).delete(where);
  }
}
