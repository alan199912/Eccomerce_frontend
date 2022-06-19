import { User } from './user.models';

export interface UserRegisterForm {
  username: string;
  email: string;
  password: string;
  country: string;
  phone: string;
  name: string;
  lastName: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface ResponseAuth {
  status: string;
  message: string;
  user: User;
  token?: string;
  isAdmin?: boolean;
}

export interface UserEmailRecoveryPassword {
  email: string;
}

export interface UserRestorePassword {
  password: string;
}

export interface ResponseId {
  status: string;
  id: number;
}

export interface InitialStateLogin {
  isLoading: boolean;
  token: string;
}
