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
  Branch,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersBranchController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/branch', {
    responses: {
      '200': {
        description: 'Branch belonging to Users',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Branch)},
          },
        },
      },
    },
  })
  async getBranch(
    @param.path.string('id') id: typeof Users.prototype.id,
  ): Promise<Branch> {
    return this.usersRepository.branch(id);
  }
}
