import {Entity, hasOne, model, property} from '@loopback/repository';
import {LmsQuestionnaire} from './lms-questionnaire.model';

@model({settings: {strict: false}})
export class LmsQuestion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  mediaid?: object;

  @property({
    type: 'array',
    itemType: 'string',
  })
  options?: string[];

  @property({
    type: 'string',
  })
  answer?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  point?: string[];

  @property({
    type: 'date',
    default: new Date(),
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @hasOne(() => LmsQuestionnaire)
  lmsQuestionnaire: LmsQuestionnaire;

  @property({
    type: 'string',
  })
  lmsResultId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<LmsQuestion>) {
    super(data);
  }
}

export interface LmsQuestionRelations {
  // describe navigational properties here
}

export type LmsQuestionWithRelations = LmsQuestion & LmsQuestionRelations;
