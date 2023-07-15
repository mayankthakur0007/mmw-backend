import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  InboxMessage,
  Users,
} from '../models';
import {InboxMessageRepository} from '../repositories';

export class InboxMessageUsersController {
  constructor(
    @repository(InboxMessageRepository)
    public inboxMessageRepository: InboxMessageRepository,
  ) { }

  @get('/inbox-messages/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to InboxMessage',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Users)},
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.string('id') id: typeof InboxMessage.prototype.id,
  ): Promise<Users> {
    return this.inboxMessageRepository.from(id);
  }
}
