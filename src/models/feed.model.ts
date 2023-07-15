import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Users} from './users.model';

@model({
  name: 'feeds',
})
export class Feed extends Entity {
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
  subject: string;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'string',
    required: true,
  })
  body: string;

  @property({
    type: 'string',
    required: true,
  })
  feedType: string;

  @belongsTo(() => Users, {name: 'createdByID'})
  createdBy: string;

  constructor(data?: Partial<Feed>) {
    super(data);
  }
}

export interface FeedRelations {
  // describe navigational properties here
}

export type FeedWithRelations = Feed & FeedRelations;
