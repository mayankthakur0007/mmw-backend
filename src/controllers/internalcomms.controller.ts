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
import {InternalComms} from '../models';
import {InternalCommsRepository} from '../repositories';

export class InternalCommsController {
  constructor(
    @repository(InternalCommsRepository)
    public InternalCommsRepository: InternalCommsRepository,
  ) {}

  @post('/internalcomms')
  @response(200, {
    description: 'InternalComms model instance',
    content: {'application/json': {schema: getModelSchemaRef(InternalComms)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InternalComms, {
            title: 'NewInternalComms',
            exclude: ['id'],
          }),
        },
      },
    })
    InternalComms: Omit<InternalComms, 'id'>,
  ): Promise<InternalComms> {
    return this.InternalCommsRepository.create(InternalComms);
  }

  @get('/internalcomms/count')
  @response(200, {
    description: 'InternalComms model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(InternalComms) where?: Where<InternalComms>): Promise<Count> {
    return this.InternalCommsRepository.count(where);
  }

  @get('/internalcomms')
  @response(200, {
    description: 'Array of InternalComms model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InternalComms, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(InternalComms) filter?: Filter<InternalComms>): Promise<InternalComms[]> {
    return this.InternalCommsRepository.find(filter);
  }

  @patch('/internalcomms')
  @response(200, {
    description: 'InternalComms PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InternalComms, {partial: true}),
        },
      },
    })
    InternalComms: InternalComms,
    @param.where(InternalComms) where?: Where<InternalComms>,
  ): Promise<Count> {
    return this.InternalCommsRepository.updateAll(InternalComms, where);
  }

  @get('/internalcomms/{id}')
  @response(200, {
    description: 'InternalComms model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InternalComms, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(InternalComms, {exclude: 'where'})
    filter?: FilterExcludingWhere<InternalComms>,
  ): Promise<InternalComms> {
    return this.InternalCommsRepository.findById(id, filter);
  }

  @patch('/internalcomms/{id}')
  @response(204, {
    description: 'InternalComms PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InternalComms, {partial: true}),
        },
      },
    })
    InternalComms: InternalComms,
  ): Promise<void> {
    await this.InternalCommsRepository.updateById(id, InternalComms);
  }

  @put('/internalcomms/{id}')
  @response(204, {
    description: 'InternalComms PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() InternalComms: InternalComms,
  ): Promise<void> {
    await this.InternalCommsRepository.replaceById(id, InternalComms);
  }

  @del('/internalcomms/{id}')
  @response(204, {
    description: 'InternalComms DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.InternalCommsRepository.deleteById(id);
  }
}
