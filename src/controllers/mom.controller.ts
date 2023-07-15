import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {MoM} from '../models';
import {MoMRepository} from '../repositories';

export class MoMController {
  constructor(
    @repository(MoMRepository)
    public momRepository: MoMRepository,
  ) {}

  @post('/mom')
  @response(200, {
    description: 'MoM model instance',
    content: {'application/json': {schema: getModelSchemaRef(MoM)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MoM, {
            title: 'NewMoM',
            exclude: ['id'],
          }),
        },
      },
    })
    mom: Omit<MoM, 'id'>,
  ): Promise<MoM> {
    return this.momRepository.create(mom);
  }

  @get('/mom/count')
  @response(200, {
    description: 'MoM model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(MoM) where?: Where<MoM>): Promise<Count> {
    return this.momRepository.count(where);
  }

  @get('/mom')
  @response(200, {
    description: 'Array of MoM model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MoM, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(MoM) filter?: Filter<MoM>): Promise<MoM[]> {
    return this.momRepository.find(filter);
  }

  @patch('/mom')
  @response(200, {
    description: 'MoM PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MoM, {partial: true}),
        },
      },
    })
    mom: MoM,
    @param.where(MoM) where?: Where<MoM>,
  ): Promise<Count> {
    return this.momRepository.updateAll(mom, where);
  }

  @get('/mom/{id}')
  @response(200, {
    description: 'MoM model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MoM, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MoM, {exclude: 'where'})
    filter?: FilterExcludingWhere<MoM>,
  ): Promise<MoM> {
    return this.momRepository.findById(id, filter);
  }

  @patch('/mom/{id}')
  @response(204, {
    description: 'MoM PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MoM, {partial: true}),
        },
      },
    })
    mom: MoM,
  ): Promise<void> {
    await this.momRepository.updateById(id, mom);
  }

  @put('/mom/{id}')
  @response(204, {
    description: 'MoM PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mom: MoM,
  ): Promise<void> {
    await this.momRepository.replaceById(id, mom);
  }

  @del('/mom/{id}')
  @response(204, {
    description: 'MoM DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.momRepository.deleteById(id);
  }
}
