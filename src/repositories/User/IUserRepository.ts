import { User } from "@/entities/User";

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User> | null;
  delete(id: string): Promise<User> | null;
  create(data: User): Promise<User>;
}
