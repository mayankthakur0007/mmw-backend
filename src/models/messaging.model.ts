import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'messaging',
})
export class Messaging extends Entity {
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
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phone_number: string;

  @property({
    type: 'array',
    itemType: "string",
    required: true,
  })
  recipient: Array<string>;

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

  constructor(data?: Partial<Messaging>) {
    super(data);
  }
}

export interface MessagingRelations {
  // describe navigational properties here
}

export type MessagingWithRelations = Messaging & MessagingRelations;
