import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'designations',
})
export class Designation extends Entity {
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
  name: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  update_at?: string;

  constructor(data?: Partial<Designation>) {
    super(data);
  }
}

export interface DesignationRelations {
  // describe navigational properties here
}

export type DesignationWithRelations = Designation & DesignationRelations;
