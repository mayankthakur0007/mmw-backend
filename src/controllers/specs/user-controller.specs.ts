import {SchemaObject} from '@loopback/rest';

export const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['civil_id', 'password'],
  properties: {
    civil_id: {
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

const ChangePasswordSchema: SchemaObject = {
  type: 'object',
  required: ['oldPassword', 'newPassword'],
  properties: {
    oldPassword: {
      type: 'string',
      minLength: 8,
    },
    newPassword: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const ChangePasswordRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: ChangePasswordSchema},
  },
};

export declare type ChangePassword = {
  oldPassword: string;
  newPassword: string;
};

const ForgetPasswordSchema: SchemaObject = {
  type: 'object',
  required: ['email'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
  },
};

export const ForgetPasswordRequestBody = {
  description: 'Input of forget pasword API',
  required: true,
  content: {
    'application/json': {schema: ForgetPasswordSchema},
  },
};

export declare type ForgetPassword = {
  email: string;
};

const NewPasswordSchema: SchemaObject = {
  type: 'object',
  required: ['newPassword'],
  properties: {
    newPassword: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const NewPasswordRequestBody = {
  description: 'Input of new-password api',
  required: true,
  content: {
    'application/json': {schema: NewPasswordSchema},
  },
};

export declare type NewPassword = {
  newPassword: string;
};

export const StoreOwners: SchemaObject = {
  type: 'object',
  required: ['newPassword'],
  properties: {
    id: {
      type: 'string',
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
  },
};

export const UserAccountSchema: SchemaObject = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    roles: {
      type: 'string',
    },
    branch: {
      type: 'object',
    },
  },
};

export const UserAccountRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: UserAccountSchema},
  },
};

export declare type UserAccount = {
  id: string;
  name: string;
  roles: string[];
  branch?: object;
};


export const UpdateUserSchema: SchemaObject = {
  type: 'object',
  properties: {
    status: {
      type: 'boolean',
    },
    email: {
      type: 'string',
    },
    phone_number: {
      type: 'string',
    },
  },
};

export const UpdateUserRequestBody = {
  description: 'Update user request body',
  required: true,
  content: {
    'application/json': {schema: UpdateUserSchema},
  },
};
