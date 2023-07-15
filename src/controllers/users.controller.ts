import {authenticate, TokenService} from '@loopback/authentication';
import {
  TokenServiceBindings,
  UserServiceBindings
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get, getModelSchemaRef,
  HttpErrors,
  param, post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {compareSync, genSalt, hash} from 'bcryptjs';
import {PasswordHasherBindings} from '../keys';
import {Users, UsersRelations, UserWithPassword} from '../models';
import {Credentials, UsersRepository} from '../repositories';
import {
  JWTService,
  PasswordHasher,
  UserManagementService,
  validateCredentials,

  validatePassword, validateRoles
} from '../services';
import {
  ChangePassword, ChangePasswordRequestBody, CredentialsRequestBody,
  UpdateUserRequestBody
} from './specs/user-controller.specs';


declare type  PublicUser =  {
  id: string;
  name: string;
  email: string;
  civil_id: string;
  branch_id: string;
  branch_name?: string;
  designation_name?: string;
  roles: string[];
  serial_number: string;
  phone_number: string;
  status: boolean;
  date_of_joining: string;
}

declare type UpdateUser = {
  status?: boolean;
  email?: string;
  phone_number?: string;
}

export class UsersController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @inject(UserServiceBindings.USER_SERVICE)
    public userManagementService: UserManagementService,
    @repository(UsersRepository) protected userRepository: UsersRepository,
  ) { }


  @post('/users/sign-in', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'object',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<object> {
    validateCredentials(credentials);
    const user = await this.userManagementService.verifyCredentials(
      credentials,
    );
    // if (!user.verificationStatus) {
    //   throw new HttpErrors.Forbidden('User is not verified.');
    // }
    const verificationObject =
      this.userManagementService.convertToUserProfile(user);
    const token = await this.jwtService.generateToken(verificationObject);
    const expiry = +JWTService.EXPIRY;
    return {
      status: 200,
      message: 'OK',
      token: token,
      expiry: Math.floor(Date.now() / 1000) + expiry,
    };
  }


  @post('/users/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserWithPassword, {
            title: 'NewUser',
          }),
        },
      },
    })
    user: UserWithPassword,
  ): Promise<object> {
    validateRoles(user.roles);
    validateCredentials({civil_id: user.civil_id, password: user.password});
    try {
      await this.userManagementService.createUser(user);
      return {
        status: 200,
        message: 'OK',
      };
    } catch (error) {
      if (error.code === 11000 && error.errmsg.includes('index: uniqueCivilId')) {
        throw new HttpErrors.Conflict('civil_id value is already taken');
      }
      throw error;
    }
  }
  private formatPublicUser(user: (Users & UsersRelations)): PublicUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      civil_id: user.civil_id,
      branch_id: user.branchId,
      branch_name: user.branch?.name || '',
      designation_name: user.designation?.name || '',
      roles: user.roles,
      serial_number: user.serial_number,
      phone_number: user.phone_number,
      status: user.status,
      date_of_joining: user.date_of_joining
    };
   }


  @get('/users')
  @response(200, {
    description: 'Array of users model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Users, {includeRelations: false}),
        },
      },
    },
  })
  async find(
  ): Promise<PublicUser[]> {
    const users = await this.userRepository.find({'include': ["branch","designation"]});
    return users.map(this.formatPublicUser);
  }

  @get('/users/info')
  @authenticate('jwt')
  @response(200, {
    description: 'Array of users model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Users, {includeRelations: true}),
        },
      },
    },
  })
  async userInfo(
    @inject(SecurityBindings.USER)
    userProfile: UserProfile,
  ): Promise<PublicUser> {
    const user = await this.userRepository.findById(userProfile[securityId], {'include': ["branch","designation"]});
    return this.formatPublicUser(user);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'Users PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody(UpdateUserRequestBody) user: UpdateUser,
  ): Promise<void> {
    const u = await this.userRepository.findById(id);
    if (user.email) {
      u.email = user.email;
    }
    if (user.phone_number) {
      u.phone_number = user.phone_number;
    }
    if (user.status !== undefined) {
      u.status = user.status;
    }
    await this.userRepository.updateById(id, u);
  }

  @authenticate('jwt')
  @post('/users/change-password', {
    responses: {
      '200': {
        description: 'Change user password',
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
      },
    },
  })
  async changePassword(
    @requestBody(ChangePasswordRequestBody) passwordData: ChangePassword,
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
  ): Promise<object> {
    validatePassword(passwordData.newPassword);
    const passwordHash = (
      await this.userRepository
        .usersCredentials(currentUserProfile[securityId])
        .get()
    ).password;
    if (!compareSync(passwordData.oldPassword, passwordHash)) {
      throw new HttpErrors.BadRequest('Current password is not correct.');
    }
    const newPasswordHash = await hash(
      passwordData.newPassword,
      await genSalt(),
    );
    await this.userRepository
      .usersCredentials(currentUserProfile[securityId])
      .patch({password: newPasswordHash});
    return {
      status: 200,
      message: 'Updated password',
    };
  }
}
