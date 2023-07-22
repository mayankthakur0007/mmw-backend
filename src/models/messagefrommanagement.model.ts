import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'messagefrommanagement',
})
export class MessageFromManagement extends Entity {
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
    type: 'string',
    required: true,
  })
  message: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  createdAt?: string;

  @property({
    type: 'object',
  })
  file?: Object;

  constructor(data?: Partial<MessageFromManagement>) {
    super(data);
  }
}

export interface MessageFromManagementRelations {
  // describe navigational properties here
}

export type MessageFromManagementWithRelations = MessageFromManagement & MessageFromManagementRelations;
