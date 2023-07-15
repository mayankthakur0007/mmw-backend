import {HttpErrors} from '@loopback/rest';
import {Users} from '../models';
import {Credentials} from '../repositories';

export function validateCivilId(civil_id: string) {
  if (civil_id.length > 15 || civil_id.length ===0) {
    throw new HttpErrors.UnprocessableEntity('invalid civil_id');
  }
}

export function validatePassword(password: string) {
  if (!password || password.length < 8) {
    throw new HttpErrors.UnprocessableEntity(
      'password must be minimum 8 characters',
    );
  }
}

export function validateCredentials(credentials: Credentials) {
  // Validate Civil Id
  validateCivilId(credentials.civil_id);

  // Validate Password Length
  validatePassword(credentials.password);
}

export function validateRoles(roles: string[]) {
  if (!roles.some(role => Users.ROLES.includes(role))) {
    throw new HttpErrors.UnprocessableEntity('Invalid Role');
  }
}
