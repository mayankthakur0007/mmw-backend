import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'user_credentials',
})
export class UsersCredentials extends Entity {
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
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  usersId: string;

  constructor(data?: Partial<UsersCredentials>) {
    super(data);
  }
}

export interface UsersCredentialsRelations {
  // describe navigational properties here
}

export type UserCredentialsWithRelations = UsersCredentials &
  UsersCredentialsRelations;
