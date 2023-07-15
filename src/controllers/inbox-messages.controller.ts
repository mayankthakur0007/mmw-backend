import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,
  patch, post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {InboxMessage} from '../models';
import {InboxMessageRepository} from '../repositories';

export class InboxMessagesController {
  constructor(
    @repository(InboxMessageRepository)
    public inboxMessageRepository : InboxMessageRepository,
  ) {}

  @post('/inbox-messages')
  @response(200, {
    description: 'InboxMessage model instance',
    content: {'application/json': {schema: getModelSchemaRef(InboxMessage)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InboxMessage, {
            title: 'NewInboxMessage',
          }),
        },
      },
    })
    inboxMessage: InboxMessage,
  ): Promise<InboxMessage> {
    return this.inboxMessageRepository.create(inboxMessage);
  }

  @get('/inbox-messages/count')
  @response(200, {
    description: 'InboxMessage model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InboxMessage) where?: Where<InboxMessage>,
  ): Promise<Count> {
    return this.inboxMessageRepository.count(where);
  }

  @get('/inbox-messages')
  @response(200, {
    description: 'Array of InboxMessage model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InboxMessage, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InboxMessage) filter?: Filter<InboxMessage>,
  ): Promise<InboxMessage[]> {
    return this.inboxMessageRepository.find(filter);
  }

  @patch('/inbox-messages')
  @response(200, {
    description: 'InboxMessage PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InboxMessage, {partial: true}),
        },
      },
    })
    inboxMessage: InboxMessage,
    @param.where(InboxMessage) where?: Where<InboxMessage>,
  ): Promise<Count> {
    return this.inboxMessageRepository.updateAll(inboxMessage, where);
  }

  @get('/inbox-messages/{id}')
  @response(200, {
    description: 'InboxMessage model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InboxMessage, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(InboxMessage, {exclude: 'where'}) filter?: FilterExcludingWhere<InboxMessage>
  ): Promise<InboxMessage> {
    return this.inboxMessageRepository.findById(id, filter);
  }

  @patch('/inbox-messages/{id}')
  @response(204, {
    description: 'InboxMessage PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InboxMessage, {partial: true}),
        },
      },
    })
    inboxMessage: InboxMessage,
  ): Promise<void> {
    await this.inboxMessageRepository.updateById(id, inboxMessage);
  }

  @put('/inbox-messages/{id}')
  @response(204, {
    description: 'InboxMessage PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() inboxMessage: InboxMessage,
  ): Promise<void> {
    await this.inboxMessageRepository.replaceById(id, inboxMessage);
  }

  @del('/inbox-messages/{id}')
  @response(204, {
    description: 'InboxMessage DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.inboxMessageRepository.deleteById(id);
  }
}
