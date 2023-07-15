import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Users} from './users.model';

@model(
  {
    name: 'inbox_message',
  }
)
export class InboxMessage extends Entity {
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
  body: string;

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
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  parentMessageId: string;

  @property({
    type: 'string',
    required: true,
  })
  tab_type: string;

  @property({
    type: 'string',
    required: true,
  })
  subject: string;

  @belongsTo(() => Users)
  toId: string;

  @belongsTo(() => Users)
  fromId: string;

  constructor(data?: Partial<InboxMessage>) {
    super(data);
  }
}

export interface InboxMessageRelations {
  // describe navigational properties here
}

export type InboxMessageWithRelations = InboxMessage & InboxMessageRelations;
