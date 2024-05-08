import { User } from "@/entities/User";
import { IUserRepository } from "./IUserRepository";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepository implements IUserRepository {
  create(data: User): Promise<User> {
    return;
  }
  async findByEmail(email: string): Promise<User> {
    
   return
  }
}
