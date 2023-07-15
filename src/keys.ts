import {UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/context';
import {Users} from './models';
import {Credentials} from './repositories';
import {PasswordHasher} from './services';

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER =
    BindingKey.create<PasswordHasher>('services.hasher');
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<Users, Credentials>>(
    'services.user.service',
  );
}

