import {belongsTo, Entity, model, property, referencesMany} from '@loopback/repository';
import {LmsCategory} from './lms-category.model';
import {LmsQuestionnaire} from './lms-questionnaire.model';
import {Media} from './media.model';

@model({settings: {strict: true}})
export class LmsStudyMaterial extends Entity {
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
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @referencesMany(() => Media)
  mediaIds: string[];

  @referencesMany(() => LmsCategory)
  categoryIds: string[];

  @belongsTo(() => LmsQuestionnaire)
  questionnaireId: string;

  constructor(data?: Partial<LmsStudyMaterial>) {
    super(data);
  }
}

export interface LmsStudyMaterialRelations {
  // describe navigational properties here
}

export type LmsStudyMaterialWithRelations = LmsStudyMaterial & LmsStudyMaterialRelations;
