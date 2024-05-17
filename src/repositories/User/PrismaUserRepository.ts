import { User } from "@/entities/User";
import { IUserRepository } from "./IUserRepository";
import { prisma } from "@/middleware/lib/prisma";

export class PrismaUserRepository implements IUserRepository {
  async create(data: User): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        secondName: data.secondName,
        password: data.password,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async delete(id: string): Promise<User> {
    const reserve = await prisma.user.delete({
      where: {
        id,
      },
    });

    return reserve;
  }

  async getAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  async checkingIsTheOwners(id: string): Promise<User> {
    const user = await prisma.user.findUnique;

    return;
  }
}
