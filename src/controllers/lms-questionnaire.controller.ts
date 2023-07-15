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
import {LmsQuestionnaire} from '../models';
import {LmsQuestionnaireRepository} from '../repositories';

export class LmsQuestionnaireController {
  constructor(
    @repository(LmsQuestionnaireRepository)
    public lmsQuestionnaireRepository : LmsQuestionnaireRepository,
  ) {}

  @post('/lms-questionnaires')
  @response(200, {
    description: 'LmsQuestionnaire model instance',
    content: {'application/json': {schema: getModelSchemaRef(LmsQuestionnaire)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsQuestionnaire, {
            title: 'NewLmsQuestionnaire',
            
          }),
        },
      },
    })
    lmsQuestionnaire: LmsQuestionnaire,
  ): Promise<LmsQuestionnaire> {
    return this.lmsQuestionnaireRepository.create(lmsQuestionnaire);
  }

  @get('/lms-questionnaires/count')
  @response(200, {
    description: 'LmsQuestionnaire model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LmsQuestionnaire) where?: Where<LmsQuestionnaire>,
  ): Promise<Count> {
    return this.lmsQuestionnaireRepository.count(where);
  }

  @get('/lms-questionnaires')
  @response(200, {
    description: 'Array of LmsQuestionnaire model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LmsQuestionnaire, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LmsQuestionnaire) filter?: Filter<LmsQuestionnaire>,
  ): Promise<LmsQuestionnaire[]> {
    return this.lmsQuestionnaireRepository.find(filter);
  }

  @patch('/lms-questionnaires')
  @response(200, {
    description: 'LmsQuestionnaire PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsQuestionnaire, {partial: true}),
        },
      },
    })
    lmsQuestionnaire: LmsQuestionnaire,
    @param.where(LmsQuestionnaire) where?: Where<LmsQuestionnaire>,
  ): Promise<Count> {
    return this.lmsQuestionnaireRepository.updateAll(lmsQuestionnaire, where);
  }

  @get('/lms-questionnaires/{id}')
  @response(200, {
    description: 'LmsQuestionnaire model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LmsQuestionnaire, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(LmsQuestionnaire, {exclude: 'where'}) filter?: FilterExcludingWhere<LmsQuestionnaire>
  ): Promise<LmsQuestionnaire> {
    return this.lmsQuestionnaireRepository.findById(id, filter);
  }

  @patch('/lms-questionnaires/{id}')
  @response(204, {
    description: 'LmsQuestionnaire PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LmsQuestionnaire, {partial: true}),
        },
      },
    })
    lmsQuestionnaire: LmsQuestionnaire,
  ): Promise<void> {
    await this.lmsQuestionnaireRepository.updateById(id, lmsQuestionnaire);
  }

  @put('/lms-questionnaires/{id}')
  @response(204, {
    description: 'LmsQuestionnaire PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lmsQuestionnaire: LmsQuestionnaire,
  ): Promise<void> {
    await this.lmsQuestionnaireRepository.replaceById(id, lmsQuestionnaire);
  }

  @del('/lms-questionnaires/{id}')
  @response(204, {
    description: 'LmsQuestionnaire DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.lmsQuestionnaireRepository.deleteById(id);
  }
}
