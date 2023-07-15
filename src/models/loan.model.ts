import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Users} from './users.model';

@model({
  name: 'loan',
})
export class Loan extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  loanAmount: number;

  @property({
    type: 'date',
  })
  createdAt?: string;

  @property({
    type: 'string',
    required: true,
  })
  purpose: string;

  @property({
    type: 'date',
    required: true,
  })
  periodStartDate: string;

  @property({
    type: 'date',
    required: true,
  })
  periodEndDate: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isApproved: boolean;

  @property({
    type: 'date',
  })
  approvedDate?: string;

  @property({
    type: 'string',
  })
  approvalRemark?: string;

  @belongsTo(() => Users, {name: 'LoanUser'})
  createdBy: string;

  constructor(data?: Partial<Loan>) {
    super(data);
  }
}

export interface LoanRelations {
  // describe navigational properties here
}

export type LoanWithRelations = Loan & LoanRelations;
