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
import {MessageFromManagement} from '../models';
import {MessageFromManagementRepository} from '../repositories';

export class MessageFromManagementController {
  constructor(
    @repository(MessageFromManagementRepository)
    public MessageFromManagementRepository: MessageFromManagementRepository,
  ) {}

  @post('/messagefrommanagement')
  @response(200, {
    description: 'MessageFromManagement model instance',
    content: {'application/json': {schema: getModelSchemaRef(MessageFromManagement)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageFromManagement, {
            title: 'NewMessageFromManagement',
            exclude: ['id'],
          }),
        },
      },
    })
    MessageFromManagement: Omit<MessageFromManagement, 'id'>,
  ): Promise<MessageFromManagement> {
    return this.MessageFromManagementRepository.create(MessageFromManagement);
  }

  @get('/messagefrommanagement/count')
  @response(200, {
    description: 'MessageFromManagement model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(MessageFromManagement) where?: Where<MessageFromManagement>): Promise<Count> {
    return this.MessageFromManagementRepository.count(where);
  }

  @get('/messagefrommanagement')
  @response(200, {
    description: 'Array of MessageFromManagement model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MessageFromManagement, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(MessageFromManagement) filter?: Filter<MessageFromManagement>): Promise<MessageFromManagement[]> {
    return this.MessageFromManagementRepository.find(filter);
  }

  @patch('/messagefrommanagement')
  @response(200, {
    description: 'MessageFromManagement PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageFromManagement, {partial: true}),
        },
      },
    })
    MessageFromManagement: MessageFromManagement,
    @param.where(MessageFromManagement) where?: Where<MessageFromManagement>,
  ): Promise<Count> {
    return this.MessageFromManagementRepository.updateAll(MessageFromManagement, where);
  }

  @get('/messagefrommanagement/{id}')
  @response(200, {
    description: 'MessageFromManagement model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MessageFromManagement, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MessageFromManagement, {exclude: 'where'})
    filter?: FilterExcludingWhere<MessageFromManagement>,
  ): Promise<MessageFromManagement> {
    return this.MessageFromManagementRepository.findById(id, filter);
  }

  @patch('/messagefrommanagement/{id}')
  @response(204, {
    description: 'MessageFromManagement PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageFromManagement, {partial: true}),
        },
      },
    })
    MessageFromManagement: MessageFromManagement,
  ): Promise<void> {
    await this.MessageFromManagementRepository.updateById(id, MessageFromManagement);
  }

  @put('/messagefrommanagement/{id}')
  @response(204, {
    description: 'MessageFromManagement PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() MessageFromManagement: MessageFromManagement,
  ): Promise<void> {
    await this.MessageFromManagementRepository.replaceById(id, MessageFromManagement);
  }

  @del('/messagefrommanagement/{id}')
  @response(204, {
    description: 'MessageFromManagement DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.MessageFromManagementRepository.deleteById(id);
  }
}
