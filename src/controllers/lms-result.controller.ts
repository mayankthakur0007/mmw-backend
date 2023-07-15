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
import {LmsResult} from '../models';
import {LmsResultRepository} from '../repositories';

export class LmsResultController {
  constructor(
    @repository(LmsResultRepository)
    public lmsResultRepository : LmsResultRepository,
  ) {}

  @post('/lms-results')
  @response(200, {
    description: 'LmsResult model instance',
    content: {'application/json': {schema: getModelSchemaRef(LmsResult)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsResult, {
            title: 'NewLmsResult',
            
          }),
        },
      },
    })
    lmsResult: LmsResult,
  ): Promise<LmsResult> {
    return this.lmsResultRepository.create(lmsResult);
  }

  @get('/lms-results/count')
  @response(200, {
    description: 'LmsResult model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LmsResult) where?: Where<LmsResult>,
  ): Promise<Count> {
    return this.lmsResultRepository.count(where);
  }

  @get('/lms-results')
  @response(200, {
    description: 'Array of LmsResult model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LmsResult, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LmsResult) filter?: Filter<LmsResult>,
  ): Promise<LmsResult[]> {
    return this.lmsResultRepository.find(filter);
  }

  @patch('/lms-results')
  @response(200, {
    description: 'LmsResult PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsResult, {partial: true}),
        },
      },
    })
    lmsResult: LmsResult,
    @param.where(LmsResult) where?: Where<LmsResult>,
  ): Promise<Count> {
    return this.lmsResultRepository.updateAll(lmsResult, where);
  }

  @get('/lms-results/{id}')
  @response(200, {
    description: 'LmsResult model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LmsResult, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(LmsResult, {exclude: 'where'}) filter?: FilterExcludingWhere<LmsResult>
  ): Promise<LmsResult> {
    return this.lmsResultRepository.findById(id, filter);
  }

  @patch('/lms-results/{id}')
  @response(204, {
    description: 'LmsResult PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsResult, {partial: true}),
        },
      },
    })
    lmsResult: LmsResult,
  ): Promise<void> {
    await this.lmsResultRepository.updateById(id, lmsResult);
  }

  @put('/lms-results/{id}')
  @response(204, {
    description: 'LmsResult PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lmsResult: LmsResult,
  ): Promise<void> {
    await this.lmsResultRepository.replaceById(id, lmsResult);
  }

  @del('/lms-results/{id}')
  @response(204, {
    description: 'LmsResult DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.lmsResultRepository.deleteById(id);
  }
}
