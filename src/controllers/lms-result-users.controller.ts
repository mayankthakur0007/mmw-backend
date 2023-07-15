import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  LmsResult,
  Users
} from '../models';
import {LmsResultRepository} from '../repositories';

export class LmsResultUsersController {
  constructor(
    @repository(LmsResultRepository) protected lmsResultRepository: LmsResultRepository,
  ) { }

  @get('/lms-results/{id}/users', {
    responses: {
      '200': {
        description: 'LmsResult has one Users',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Users>,
  ): Promise<Users> {
    return this.lmsResultRepository.users(id).get(filter);
  }

  @post('/lms-results/{id}/users', {
    responses: {
      '200': {
        description: 'LmsResult model instance',
        content: {'application/json': {schema: getModelSchemaRef(Users)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof LmsResult.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsResult, {
            title: 'NewUsersInLmsResult',
            exclude: ['id'],
            optional: ['lmsResultId']
          }),
        },
      },
    }) users: Omit<Users, 'id'>,
  ): Promise<Users> {
    return this.lmsResultRepository.users(id).create(users);
  }

  @patch('/lms-results/{id}/users', {
    responses: {
      '200': {
        description: 'LmsResult.Users PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Partial<Users>,
    @param.query.object('where', getWhereSchemaFor(Users)) where?: Where<Users>,
  ): Promise<Count> {
    return this.lmsResultRepository.users(id).patch(users, where);
  }

  @del('/lms-results/{id}/users', {
    responses: {
      '200': {
        description: 'LmsResult.Users DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Users)) where?: Where<Users>,
  ): Promise<Count> {
    return this.lmsResultRepository.users(id).delete(where);
  }
}
