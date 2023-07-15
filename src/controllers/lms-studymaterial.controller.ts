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
import {LmsStudyMaterial} from '../models';
import {LmsStudyMaterialRepository} from '../repositories';

export class LmsStudymaterialController {
  constructor(
    @repository(LmsStudyMaterialRepository)
    public lmsStudyMaterialRepository : LmsStudyMaterialRepository,
  ) {}

  @post('/lms-study-materials')
  @response(200, {
    description: 'LmsStudyMaterial model instance',
    content: {'application/json': {schema: getModelSchemaRef(LmsStudyMaterial)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsStudyMaterial, {
            title: 'NewLmsStudyMaterial',
            
          }),
        },
      },
    })
    lmsStudyMaterial: LmsStudyMaterial,
  ): Promise<LmsStudyMaterial> {
    return this.lmsStudyMaterialRepository.create(lmsStudyMaterial);
  }

  @get('/lms-study-materials/count')
  @response(200, {
    description: 'LmsStudyMaterial model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LmsStudyMaterial) where?: Where<LmsStudyMaterial>,
  ): Promise<Count> {
    return this.lmsStudyMaterialRepository.count(where);
  }

  @get('/lms-study-materials')
  @response(200, {
    description: 'Array of LmsStudyMaterial model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LmsStudyMaterial, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LmsStudyMaterial) filter?: Filter<LmsStudyMaterial>,
  ): Promise<LmsStudyMaterial[]> {
    return this.lmsStudyMaterialRepository.find(filter);
  }

  @patch('/lms-study-materials')
  @response(200, {
    description: 'LmsStudyMaterial PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsStudyMaterial, {partial: true}),
        },
      },
    })
    lmsStudyMaterial: LmsStudyMaterial,
    @param.where(LmsStudyMaterial) where?: Where<LmsStudyMaterial>,
  ): Promise<Count> {
    return this.lmsStudyMaterialRepository.updateAll(lmsStudyMaterial, where);
  }

  @get('/lms-study-materials/{id}')
  @response(200, {
    description: 'LmsStudyMaterial model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LmsStudyMaterial, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(LmsStudyMaterial, {exclude: 'where'}) filter?: FilterExcludingWhere<LmsStudyMaterial>
  ): Promise<LmsStudyMaterial> {
    return this.lmsStudyMaterialRepository.findById(id, filter);
  }

  @patch('/lms-study-materials/{id}')
  @response(204, {
    description: 'LmsStudyMaterial PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsStudyMaterial, {partial: true}),
        },
      },
    })
    lmsStudyMaterial: LmsStudyMaterial,
  ): Promise<void> {
    await this.lmsStudyMaterialRepository.updateById(id, lmsStudyMaterial);
  }

  @put('/lms-study-materials/{id}')
  @response(204, {
    description: 'LmsStudyMaterial PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lmsStudyMaterial: LmsStudyMaterial,
  ): Promise<void> {
    await this.lmsStudyMaterialRepository.replaceById(id, lmsStudyMaterial);
  }

  @del('/lms-study-materials/{id}')
  @response(204, {
    description: 'LmsStudyMaterial DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.lmsStudyMaterialRepository.deleteById(id);
  }
}
