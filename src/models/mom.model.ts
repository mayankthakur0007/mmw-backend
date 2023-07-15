import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'mom',
})
export class MoM extends Entity {
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
  hosted_by: string;

  @property({
    type: 'string',
    required: true,
  })
  branch: string;

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

  constructor(data?: Partial<MoM>) {
    super(data);
  }
}

export interface MoMRelations {
  // describe navigational properties here
}

export type MoMWithRelations = MoM & MoMRelations;
