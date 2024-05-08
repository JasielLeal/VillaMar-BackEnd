import { PrismaUserRepository } from "@/repositories/User/PrismaUserRepository";
import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase/CreateUserUseCase";
import { CreateUserDTO } from "./CreateUserUseCase/CreateUserDTO";
import { ErrorUserAlreadyExist } from "@/erros/ErrorUserAlreadyExist";

export class UserController {
  async create(request: Request, response: Response) {
    try {
      const prismaUserRepository = new PrismaUserRepository();

      const createUserUseCase = new CreateUserUseCase(prismaUserRepository);

      const { name, email, password, avatar }: CreateUserDTO = request.body;

      const user = createUserUseCase.execute({
        email,
        name,
        password,
        avatar,
      });

      return response.status(201).send({ user });
    } catch (err) {
      if (err instanceof ErrorUserAlreadyExist) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }
}
