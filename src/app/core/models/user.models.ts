import { Role } from './role.models';

export interface User {
  id: number;
  country: string;
  discordName: string;
  email: string;
  lastName: string;
  name: string;
  phone: string;
  roleId: number | string;
  status: number | string;
  username: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  Role?: Role;
}

export interface ResponseUser {
  status: string;
  user?: User;
  users?: User[];
  message?: string;
}

export interface InitialStateUser {
  user: Readonly<User>;
  isLoading: boolean;
}
