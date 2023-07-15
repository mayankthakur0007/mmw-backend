import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'branches',
})
export class Branch extends Entity {
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
    type: 'string',
    required: true,
  })
  contactEmail: string;

  @property({
    type: 'string',
    required: true,
  })
  contactPhoneNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  constructor(data?: Partial<Branch>) {
    super(data);
  }
}

export interface BranchRelations {
  // describe navigational properties here
}

export type BranchWithRelations = Branch & BranchRelations;
