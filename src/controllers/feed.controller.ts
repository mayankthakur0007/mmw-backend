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
import {Feed} from '../models';
import {FeedRepository} from '../repositories';

export class FeedController {
  constructor(
    @repository(FeedRepository)
    public feedRepository : FeedRepository,
  ) {}

  @post('/feeds')
  @response(200, {
    description: 'Feed model instance',
    content: {'application/json': {schema: getModelSchemaRef(Feed)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Feed, {
            title: 'NewFeed',
            exclude: ['id'],
          }),
        },
      },
    })
    feed: Omit<Feed, 'id'>,
  ): Promise<Feed> {
    return this.feedRepository.create(feed);
  }

  @get('/feeds/count')
  @response(200, {
    description: 'Feed model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Feed) where?: Where<Feed>,
  ): Promise<Count> {
    return this.feedRepository.count(where);
  }

  @get('/feeds')
  @response(200, {
    description: 'Array of Feed model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Feed, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Feed) filter?: Filter<Feed>,
  ): Promise<Feed[]> {
    return this.feedRepository.find(filter);
  }

  @patch('/feeds')
  @response(200, {
    description: 'Feed PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Feed, {partial: true}),
        },
      },
    })
    feed: Feed,
    @param.where(Feed) where?: Where<Feed>,
  ): Promise<Count> {
    return this.feedRepository.updateAll(feed, where);
  }

  @get('/feeds/{id}')
  @response(200, {
    description: 'Feed model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Feed, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Feed, {exclude: 'where'}) filter?: FilterExcludingWhere<Feed>
  ): Promise<Feed> {
    return this.feedRepository.findById(id, filter);
  }

  @patch('/feeds/{id}')
  @response(204, {
    description: 'Feed PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Feed, {partial: true}),
        },
      },
    })
    feed: Feed,
  ): Promise<void> {
    await this.feedRepository.updateById(id, feed);
  }

  @put('/feeds/{id}')
  @response(204, {
    description: 'Feed PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() feed: Feed,
  ): Promise<void> {
    await this.feedRepository.replaceById(id, feed);
  }

  @del('/feeds/{id}')
  @response(204, {
    description: 'Feed DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.feedRepository.deleteById(id);
  }
}
