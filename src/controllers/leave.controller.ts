import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Leave} from '../models';
import {LeaveRepository} from '../repositories';

export class LeaveController {
  constructor(
    @repository(LeaveRepository)
    public leaveRepository : LeaveRepository,
  ) {}

  @post('/leaves')
  @response(200, {
    description: 'Leave model instance',
    content: {'application/json': {schema: getModelSchemaRef(Leave)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Leave, {
            title: 'NewLeave',
            exclude: ['id'],
          }),
        },
      },
    })
    leave: Omit<Leave, 'id'>,
  ): Promise<Leave> {
    return this.leaveRepository.create(leave);
  }

  @get('/leaves/count')
  @response(200, {
    description: 'Leave model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Leave) where?: Where<Leave>,
  ): Promise<Count> {
    return this.leaveRepository.count(where);
  }

  @get('/leaves')
  @response(200, {
    description: 'Array of Leave model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Leave, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Leave) filter?: Filter<Leave>,
  ): Promise<Leave[]> {
    return this.leaveRepository.find(filter);
  }

  @patch('/leaves')
  @response(200, {
    description: 'Leave PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Leave, {partial: true}),
        },
      },
    })
    leave: Leave,
    @param.where(Leave) where?: Where<Leave>,
  ): Promise<Count> {
    return this.leaveRepository.updateAll(leave, where);
  }

  @get('/leaves/{id}')
  @response(200, {
    description: 'Leave model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Leave, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Leave, {exclude: 'where'}) filter?: FilterExcludingWhere<Leave>
  ): Promise<Leave> {
    return this.leaveRepository.findById(id, filter);
  }

  @patch('/leaves/{id}')
  @response(204, {
    description: 'Leave PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Leave, {partial: true}),
        },
      },
    })
    leave: Leave,
  ): Promise<void> {
    await this.leaveRepository.updateById(id, leave);
  }

  @put('/leaves/{id}')
  @response(204, {
    description: 'Leave PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() leave: Leave,
  ): Promise<void> {
    await this.leaveRepository.replaceById(id, leave);
  }

  @del('/leaves/{id}')
  @response(204, {
    description: 'Leave DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.leaveRepository.deleteById(id);
  }
}
