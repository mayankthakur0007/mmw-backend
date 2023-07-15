import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  LmsStudymaterialAllotment,
  Users,
} from '../models';
import {LmsStudymaterialAllotmentRepository} from '../repositories';

export class LmsStudymaterialAllotmentUsersController {
  constructor(
    @repository(LmsStudymaterialAllotmentRepository)
    public lmsStudymaterialAllotmentRepository: LmsStudymaterialAllotmentRepository,
  ) { }

  @get('/lms-studymaterial-allotments/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to LmsStudymaterialAllotment',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Users)},
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.string('id') id: typeof LmsStudymaterialAllotment.prototype.id,
  ): Promise<Users> {
    return this.lmsStudymaterialAllotmentRepository.user(id);
  }
}
