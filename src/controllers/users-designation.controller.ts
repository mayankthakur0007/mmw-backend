import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Users,
  Designation,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersDesignationController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/designation', {
    responses: {
      '200': {
        description: 'Designation belonging to Users',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Designation)},
          },
        },
      },
    },
  })
  async getDesignation(
    @param.path.string('id') id: typeof Users.prototype.id,
  ): Promise<Designation> {
    return this.usersRepository.designation(id);
  }
}
