import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Branch} from './branch.model';
import {Designation} from './designation.model';
import {UsersCredentials} from './users-credentials.model';

@model({
  name: 'users',
  settings: {
    indexes: {
      uniqueCivilID: {
        keys: {
          civil_id: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class Users extends Entity {
  public static ROLE_SUPER_ADMIN = 'super-admin';
  public static ROLE_ADMIN = 'admin';
  public static ROLE_MANAGEMENT = 'management';
  public static ROLE_STAFF = 'staff';
  public static ROLES = [
    Users.ROLE_SUPER_ADMIN,
    Users.ROLE_ADMIN,
    Users.ROLE_STAFF,
    Users.ROLE_MANAGEMENT,
  ];

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: false,
  })
  phone_number: string;

  @property({
    type: 'string',
    required: false,
  })
  email: string;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @property({
    type: 'string',
    required: true,
  })
  serial_number: string;

  @property({
    type: 'date',
    required: true,
  })
  date_of_joining: string;

  @property({
    type: 'string',
    required: true,
  })
  civil_id: string;

  @property({
    type: 'date',
    required: true,
  })
  civil_id_expiry: string;

  @property({
    type: 'date',
  })
  medical_expiry?: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  roles: string[];

  @belongsTo(() => Branch)
  branchId: string;

  @belongsTo(() => Designation)
  designationId: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  createdOn?: string;

  @property({
    type: 'date',
  })
  updatedOn?: string;

  @hasOne(() => UsersCredentials)
  userCredentials: UsersCredentials;


  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  branch?: Branch,
  designation?: Designation,
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
