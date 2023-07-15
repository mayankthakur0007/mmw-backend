import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {LmsQuestion} from '../models';
import {LmsQuestionRepository} from '../repositories';

export class LmsQuestionController {
  constructor(
    @repository(LmsQuestionRepository)
    public lmsQuestionRepository : LmsQuestionRepository,
  ) {}

  @post('/lms-questions')
  @response(200, {
    description: 'LmsQuestion model instance',
    content: {'application/json': {schema: getModelSchemaRef(LmsQuestion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsQuestion, {
            title: 'NewLmsQuestion',
            
          }),
        },
      },
    })
    lmsQuestion: LmsQuestion,
  ): Promise<LmsQuestion> {
    return this.lmsQuestionRepository.create(lmsQuestion);
  }

  @get('/lms-questions/count')
  @response(200, {
    description: 'LmsQuestion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LmsQuestion) where?: Where<LmsQuestion>,
  ): Promise<Count> {
    return this.lmsQuestionRepository.count(where);
  }

  @get('/lms-questions')
  @response(200, {
    description: 'Array of LmsQuestion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LmsQuestion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LmsQuestion) filter?: Filter<LmsQuestion>,
  ): Promise<LmsQuestion[]> {
    return this.lmsQuestionRepository.find(filter);
  }

  @patch('/lms-questions')
  @response(200, {
    description: 'LmsQuestion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsQuestion, {partial: true}),
        },
      },
    })
    lmsQuestion: LmsQuestion,
    @param.where(LmsQuestion) where?: Where<LmsQuestion>,
  ): Promise<Count> {
    return this.lmsQuestionRepository.updateAll(lmsQuestion, where);
  }

  @get('/lms-questions/{id}')
  @response(200, {
    description: 'LmsQuestion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LmsQuestion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(LmsQuestion, {exclude: 'where'}) filter?: FilterExcludingWhere<LmsQuestion>
  ): Promise<LmsQuestion> {
    return this.lmsQuestionRepository.findById(id, filter);
  }

  @patch('/lms-questions/{id}')
  @response(204, {
    description: 'LmsQuestion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsQuestion, {partial: true}),
        },
      },
    })
    lmsQuestion: LmsQuestion,
  ): Promise<void> {
    await this.lmsQuestionRepository.updateById(id, lmsQuestion);
  }

  @put('/lms-questions/{id}')
  @response(204, {
    description: 'LmsQuestion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lmsQuestion: LmsQuestion,
  ): Promise<void> {
    await this.lmsQuestionRepository.replaceById(id, lmsQuestion);
  }

  @del('/lms-questions/{id}')
  @response(204, {
    description: 'LmsQuestion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.lmsQuestionRepository.deleteById(id);
  }
}
