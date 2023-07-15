import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class LmsQuestionnaire extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @property({
    type: 'string',
  })
  lmsQuestionId?: string;

  @property({
    type: 'string',
  })
  lmsResultId?: string;

  constructor(data?: Partial<LmsQuestionnaire>) {
    super(data);
  }
}

export interface LmsQuestionnaireRelations {
  // describe navigational properties here
}

export type LmsQuestionnaireWithRelations = LmsQuestionnaire & LmsQuestionnaireRelations;
