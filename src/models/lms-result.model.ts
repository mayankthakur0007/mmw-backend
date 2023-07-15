import {Entity, hasOne, model, property} from '@loopback/repository';
import {LmsQuestion} from './lms-question.model';
import {LmsQuestionnaire} from './lms-questionnaire.model';
import {Users} from './users.model';

@model({settings: {strict: false}})
export class LmsResult extends Entity {
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
  answer: string;

  @property({
    type: 'number',
    required: true,
  })
  score: number;

  @property({
    type: 'date',
    default: new Date(),
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @hasOne(() => Users)
  users: Users;

  @hasOne(() => LmsQuestionnaire)
  lmsQuestionnaire: LmsQuestionnaire;

  @hasOne(() => LmsQuestion)
  lmsQuestion: LmsQuestion;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<LmsResult>) {
    super(data);
  }
}

export interface LmsResultRelations {
  // describe navigational properties here
}

export type LmsResultWithRelations = LmsResult & LmsResultRelations;
