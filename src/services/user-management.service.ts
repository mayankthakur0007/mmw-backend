import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import _ from 'lodash';
import {PasswordHasherBindings} from '../keys';
import {Users, UserWithPassword} from '../models';
import {Credentials, UsersRepository} from '../repositories';
import {PasswordHasher} from './hash.password.bcryptjs';

export class UserManagementService implements UserService<Users, Credentials> {
  constructor(
    @repository(UsersRepository)
    public userRepository: UsersRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<Users> {
    const {civil_id, password} = credentials;
    const foundUser = await this.userRepository.findOne({
      where: {civil_id},
    });
    if (!foundUser) {
      throw new HttpErrors.NotFound("civil id doesn't exists");
    }
    const credentialsFound = await this.userRepository.findCredentials(
      foundUser.id,
    );
    if (!credentialsFound) {
      throw new HttpErrors.NotFound("password doesn't exists");
    }
    const passwordMatched = await this.passwordHasher.comparePassword(
      password,
      credentialsFound.password,
    );
    if (!passwordMatched) {
      throw new HttpErrors.BadRequest('invalid password');
    }
    return foundUser;
  }

  convertToUserProfile(user: Users): UserProfile {
    // since first name and lastName are optional, no error is thrown if not provided
    let userName = '';
    if (user.name) userName = `${user.name}`;
    return {
      [securityId]: user.id,
      name: userName,
      id: user.id,
      roles: user.roles,
    };
  }

  async createUser(userWithPassword: UserWithPassword): Promise<Users> {
    const password = await this.passwordHasher.hashPassword(
      userWithPassword.password,
    );
    userWithPassword.password = password;
    const user = await this.userRepository.create(
      _.omit(userWithPassword, 'password'),
    );
    user.id = user?.id.toString();
    await this.userRepository.usersCredentials(user.id).create({password});
    return user;
  }

  async updateUser(id: string, updatedUser: Users) {
    updatedUser.updatedOn = new Date().toString();
    await this.userRepository.updateById(id, updatedUser);
  }

  async findById(id: string): Promise<Users> {
    const user = await this.userRepository.findById(id);
    return user;
  }

  // async saveVerifiedUser(userProfile: UserProfile, token: string) {
  //   const user = await this.userRepository.findById(userProfile[securityId]);
  //   if (user.verificationToken !== token) {
  //     throw new HttpErrors.NotFound('Verification token not matchuing.');
  //   }
  //   user.verificationToken = undefined;
  //   user.verificationStatus = true;
  //   user.profileStatus = Users.ACTIVE_PROFILE_STATUS;
  //   await this.updateUser(user.id, user);
  // }

  async findUserWithEmail(email: string): Promise<Users> {
    const invalidCredentialsError = 'Invalid email.';
    if (!email) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    const foundUser = await this.userRepository.findOne({
      where: {email},
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    return foundUser;
  }
}
