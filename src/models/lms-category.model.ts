import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class LmsCategory extends Entity {
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
  title: string;

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
  })
  lmsStudyMaterialId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<LmsCategory>) {
    super(data);
  }
}

export interface LmsCategoryRelations {
  // describe navigational properties here
}

export type LmsCategoryWithRelations = LmsCategory & LmsCategoryRelations;
