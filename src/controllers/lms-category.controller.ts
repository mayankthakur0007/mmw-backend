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
import {LmsCategory} from '../models';
import {LmsCategoryRepository} from '../repositories';

export class LmsCategoryController {
  constructor(
    @repository(LmsCategoryRepository)
    public lmsCategoryRepository : LmsCategoryRepository,
  ) {}

  @post('/lms-categories')
  @response(200, {
    description: 'LmsCategory model instance',
    content: {'application/json': {schema: getModelSchemaRef(LmsCategory)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsCategory, {
            title: 'NewLmsCategory',
            
          }),
        },
      },
    })
    lmsCategory: LmsCategory,
  ): Promise<LmsCategory> {
    return this.lmsCategoryRepository.create(lmsCategory);
  }

  @get('/lms-categories/count')
  @response(200, {
    description: 'LmsCategory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LmsCategory) where?: Where<LmsCategory>,
  ): Promise<Count> {
    return this.lmsCategoryRepository.count(where);
  }

  @get('/lms-categories')
  @response(200, {
    description: 'Array of LmsCategory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LmsCategory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LmsCategory) filter?: Filter<LmsCategory>,
  ): Promise<LmsCategory[]> {
    return this.lmsCategoryRepository.find(filter);
  }

  @patch('/lms-categories')
  @response(200, {
    description: 'LmsCategory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsCategory, {partial: true}),
        },
      },
    })
    lmsCategory: LmsCategory,
    @param.where(LmsCategory) where?: Where<LmsCategory>,
  ): Promise<Count> {
    return this.lmsCategoryRepository.updateAll(lmsCategory, where);
  }

  @get('/lms-categories/{id}')
  @response(200, {
    description: 'LmsCategory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LmsCategory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(LmsCategory, {exclude: 'where'}) filter?: FilterExcludingWhere<LmsCategory>
  ): Promise<LmsCategory> {
    return this.lmsCategoryRepository.findById(id, filter);
  }

  @patch('/lms-categories/{id}')
  @response(204, {
    description: 'LmsCategory PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsCategory, {partial: true}),
        },
      },
    })
    lmsCategory: LmsCategory,
  ): Promise<void> {
    await this.lmsCategoryRepository.updateById(id, lmsCategory);
  }

  @put('/lms-categories/{id}')
  @response(204, {
    description: 'LmsCategory PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lmsCategory: LmsCategory,
  ): Promise<void> {
    await this.lmsCategoryRepository.replaceById(id, lmsCategory);
  }

  @del('/lms-categories/{id}')
  @response(204, {
    description: 'LmsCategory DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.lmsCategoryRepository.deleteById(id);
  }
}
