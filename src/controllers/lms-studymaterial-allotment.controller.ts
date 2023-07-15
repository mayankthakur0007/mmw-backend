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
import {LmsStudymaterialAllotment} from '../models';
import {LmsStudymaterialAllotmentRepository} from '../repositories';

export class LmsStudymaterialAllotmentController {
  constructor(
    @repository(LmsStudymaterialAllotmentRepository)
    public lmsStudymaterialAllotmentRepository : LmsStudymaterialAllotmentRepository,
  ) {}

  @post('/lms-studymaterial-allotments')
  @response(200, {
    description: 'LmsStudymaterialAllotment model instance',
    content: {'application/json': {schema: getModelSchemaRef(LmsStudymaterialAllotment)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsStudymaterialAllotment, {
            title: 'NewLmsStudymaterialAllotment',
            
          }),
        },
      },
    })
    lmsStudymaterialAllotment: LmsStudymaterialAllotment,
  ): Promise<LmsStudymaterialAllotment> {
    return this.lmsStudymaterialAllotmentRepository.create(lmsStudymaterialAllotment);
  }

  @get('/lms-studymaterial-allotments/count')
  @response(200, {
    description: 'LmsStudymaterialAllotment model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LmsStudymaterialAllotment) where?: Where<LmsStudymaterialAllotment>,
  ): Promise<Count> {
    return this.lmsStudymaterialAllotmentRepository.count(where);
  }

  @get('/lms-studymaterial-allotments')
  @response(200, {
    description: 'Array of LmsStudymaterialAllotment model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LmsStudymaterialAllotment, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LmsStudymaterialAllotment) filter?: Filter<LmsStudymaterialAllotment>,
  ): Promise<LmsStudymaterialAllotment[]> {
    return this.lmsStudymaterialAllotmentRepository.find(filter);
  }

  @patch('/lms-studymaterial-allotments')
  @response(200, {
    description: 'LmsStudymaterialAllotment PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsStudymaterialAllotment, {partial: true}),
        },
      },
    })
    lmsStudymaterialAllotment: LmsStudymaterialAllotment,
    @param.where(LmsStudymaterialAllotment) where?: Where<LmsStudymaterialAllotment>,
  ): Promise<Count> {
    return this.lmsStudymaterialAllotmentRepository.updateAll(lmsStudymaterialAllotment, where);
  }

  @get('/lms-studymaterial-allotments/{id}')
  @response(200, {
    description: 'LmsStudymaterialAllotment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LmsStudymaterialAllotment, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(LmsStudymaterialAllotment, {exclude: 'where'}) filter?: FilterExcludingWhere<LmsStudymaterialAllotment>
  ): Promise<LmsStudymaterialAllotment> {
    return this.lmsStudymaterialAllotmentRepository.findById(id, filter);
  }

  @patch('/lms-studymaterial-allotments/{id}')
  @response(204, {
    description: 'LmsStudymaterialAllotment PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsStudymaterialAllotment, {partial: true}),
        },
      },
    })
    lmsStudymaterialAllotment: LmsStudymaterialAllotment,
  ): Promise<void> {
    await this.lmsStudymaterialAllotmentRepository.updateById(id, lmsStudymaterialAllotment);
  }

  @put('/lms-studymaterial-allotments/{id}')
  @response(204, {
    description: 'LmsStudymaterialAllotment PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lmsStudymaterialAllotment: LmsStudymaterialAllotment,
  ): Promise<void> {
    await this.lmsStudymaterialAllotmentRepository.replaceById(id, lmsStudymaterialAllotment);
  }

  @del('/lms-studymaterial-allotments/{id}')
  @response(204, {
    description: 'LmsStudymaterialAllotment DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.lmsStudymaterialAllotmentRepository.deleteById(id);
  }
}
