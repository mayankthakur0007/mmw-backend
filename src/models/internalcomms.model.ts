import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'internalcomms',
})
export class InternalComms extends Entity {
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

  constructor(data?: Partial<InternalComms>) {
    super(data);
  }
}

export interface InternalCommsRelations {
  // describe navigational properties here
}

export type InternalCommsWithRelations = InternalComms & InternalCommsRelations;
