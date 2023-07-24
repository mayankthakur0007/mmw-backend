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
import {Messaging} from '../models';
import {MessagingRepository} from '../repositories';

export class MessagingController {
  constructor(
    @repository(MessagingRepository)
    public MessagingRepository: MessagingRepository,
  ) {}

  @post('/messaging')
  @response(200, {
    description: 'Messaging model instance',
    content: {'application/json': {schema: getModelSchemaRef(Messaging)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Messaging, {
            title: 'NewMessaging',
            exclude: ['id'],
          }),
        },
      },
    })
    Messaging: Omit<Messaging, 'id'>,
  ): Promise<Messaging> {
    return this.MessagingRepository.create(Messaging);
  }

  @get('/messaging/count')
  @response(200, {
    description: 'Messaging model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Messaging) where?: Where<Messaging>): Promise<Count> {
    return this.MessagingRepository.count(where);
  }

  @get('/messaging')
  @response(200, {
    description: 'Array of Messaging model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Messaging, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Messaging) filter?: Filter<Messaging>): Promise<Messaging[]> {
    return this.MessagingRepository.find(filter);
  }

  @patch('/messaging')
  @response(200, {
    description: 'Messaging PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Messaging, {partial: true}),
        },
      },
    })
    Messaging: Messaging,
    @param.where(Messaging) where?: Where<Messaging>,
  ): Promise<Count> {
    return this.MessagingRepository.updateAll(Messaging, where);
  }

  @get('/messaging/{id}')
  @response(200, {
    description: 'Messaging model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Messaging, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Messaging, {exclude: 'where'})
    filter?: FilterExcludingWhere<Messaging>,
  ): Promise<Messaging> {
    return this.MessagingRepository.findById(id, filter);
  }

  @patch('/messaging/{id}')
  @response(204, {
    description: 'Messaging PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Messaging, {partial: true}),
        },
      },
    })
    Messaging: Messaging,
  ): Promise<void> {
    await this.MessagingRepository.updateById(id, Messaging);
  }

  @put('/messaging/{id}')
  @response(204, {
    description: 'Messaging PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() Messaging: Messaging,
  ): Promise<void> {
    await this.MessagingRepository.replaceById(id, Messaging);
  }

  @del('/messaging/{id}')
  @response(204, {
    description: 'Messaging DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.MessagingRepository.deleteById(id);
  }
}
