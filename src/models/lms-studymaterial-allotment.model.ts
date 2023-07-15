import {belongsTo, Entity, model, property} from '@loopback/repository';
import {LmsQuestionnaire} from './lms-questionnaire.model';
import {Users} from './users.model';

@model({settings: {strict: false}})
export class LmsStudymaterialAllotment extends Entity {
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
  status: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @belongsTo(() => Users, {name: 'user'})
  usersId: string;

  @belongsTo(() => LmsQuestionnaire)
  lmsQuestionnaireId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<LmsStudymaterialAllotment>) {
    super(data);
  }
}

export interface LmsStudymaterialAllotmentRelations {
  // describe navigational properties here
}

export type LmsStudymaterialAllotmentWithRelations = LmsStudymaterialAllotment & LmsStudymaterialAllotmentRelations;
