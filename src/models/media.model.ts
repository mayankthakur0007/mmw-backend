import {Entity, model, property} from '@loopback/repository';

@model()
export class Media extends Entity {
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
  file_extension: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  created_at?: string;

  @property({
    type: 'string',
    required: true,
  })
  path: string;

  constructor(data?: Partial<Media>) {
    super(data);
  }
}

export interface MediaRelations {
  // describe navigational properties here
}

export type MediaWithRelations = Media & MediaRelations;
