import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Feed,
  Users,
} from '../models';
import {FeedRepository} from '../repositories';

export class FeedUsersController {
  constructor(
    @repository(FeedRepository)
    public feedRepository: FeedRepository,
  ) { }

  @get('/feeds/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to Feed',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Users)},
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.string('id') id: typeof Feed.prototype.id,
  ): Promise<Users> {
    return this.feedRepository.createdByID(id);
  }
}
