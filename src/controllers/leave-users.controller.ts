import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Leave,
  Users
} from '../models';
import {LeaveRepository} from '../repositories';

export class LeaveUsersController {
  constructor(
    @repository(LeaveRepository)
    public leaveRepository: LeaveRepository,
  ) { }

  @get('/leaves/{id}/approved-by-hr', {
    responses: {
      '200': {
        description: 'Users belonging to Leave',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Users)},
          },
        },
      },
    },
  })
  async getAppliedBy(
    @param.path.string('id') id: typeof Leave.prototype.id,
  ): Promise<Users> {
    return this.leaveRepository.appliedById(id);
  }

  @get('/leaves/{id}/approved-by-hr', {
    responses: {
      '200': {
        description: 'Users belonging to Leave',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Users)},
          },
        },
      },
    },
  })
  async getApprovedHR(
    @param.path.string('id') id: typeof Leave.prototype.id,
  ): Promise<Users> {
    return this.leaveRepository.approvedByHRId(id);
  }

  @get('/leaves/{id}/approved-by-manger', {
    responses: {
      '200': {
        description: 'Users belonging to Leave',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Users)},
          },
        },
      },
    },
  })
  async getApprovedManager(
    @param.path.string('id') id: typeof Leave.prototype.id,
  ): Promise<Users> {
    return this.leaveRepository.approvedByManagerId(id);
  }
}
