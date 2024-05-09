export interface CreateUserDTO {
  id?: string;
  name: string;
  secondName: string
  email: string;
  password: string;
  isOwner?: string;
  avatar?: string;
  createdAt?: Date;
}
