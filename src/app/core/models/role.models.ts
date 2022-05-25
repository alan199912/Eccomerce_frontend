export interface roleResponse {
  status: string;
  roles?: Role[];
  role?: Role;
  message?: string;
}

export interface Role {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
