import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Users} from './users.model';

@model({
  name: 'leaves',
})
export class Leave extends Entity {
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
  kuwaitPhoneNumber: string;

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
    required: true,
  })
  alternativePhoneNumber: string;

  @property({
    type: 'string',
    required: true,
  })
  leaveType: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'date',
    required: true,
  })
  endDate: string;

  @property({
    type: 'date',
  })
  lastVacationDate?: string;

  @property({
    type: 'number',
    required: true,
  })
  totalDaysAvailed: number;

  @property({
    type: 'boolean',
  })
  isYourLastVacationDelayed?: boolean;

  @property({
    type: 'boolean',
  })
  isFirstVacation?: boolean;

  @property({
    type: 'boolean',
  })
  isMoneyOwned?: boolean;

  @property({
    type: 'date',
  })
  dateOfMoneyOwned?: string;

  @property({
    type: 'number',
  })
  totalMoneyOwned?: number;

  @property({
    type: 'string',
  })
  flightPreference?: string;

  @property({
    type: 'string',
  })
  mentionDestinationTicket?: string;

  @property({
    type: 'boolean',
    required: false,
  })
  isReadyToPayTicketVariables: boolean;

  @property({
    type: 'date',
  })
  approvedByManagerOn?: string;

  @property({
    type: 'boolean',
    required: false,
  })
  approvedByHr: boolean;

  @property({
    type: 'date',
  })
  approvedByHrOn?: string;

  @belongsTo(() => Users, {name: 'appliedById'})
  appliedBy: string;

  @belongsTo(() => Users, {name: 'approvedByManagerId'})
  approvedByManager: string;

  @belongsTo(() => Users, {name: 'approvedByHRId'})
  approvedByHR: string;

  constructor(data?: Partial<Leave>) {
    super(data);
  }
}

export interface LeaveRelations {
  // describe navigational properties here
}

export type LeaveWithRelations = Leave & LeaveRelations;
