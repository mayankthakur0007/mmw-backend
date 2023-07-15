import {model, property} from '@loopback/repository';
import {Users} from './users.model';

@model()
export class UserWithPassword extends Users {
  @property({
    type: 'string',
    required: false,
  })
  password: string;
}
