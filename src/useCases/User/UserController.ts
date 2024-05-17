import { PrismaUserRepository } from "@/repositories/User/PrismaUserRepository";
import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase/CreateUserUseCase";
import { CreateUserDTO } from "./CreateUserUseCase/CreateUserDTO";
import { ErrorUserAlreadyExist } from "@/erros/ErrorUserAlreadyNotExist";
import { AuthenticateUseCase } from "./AuthenticateUseCase/AuthenticateUseCase";
import { AuthenticateDTO } from "./AuthenticateUseCase/AuthenticateDTO";
import { ErrorCreditalsInvalid } from "@/erros/ErrorCredetialsInvalid";
import { GetUserUseCase } from "./GetUserUseCase/GetUserUseCase";

export class UserController {
  async create(request: Request, response: Response) {
    try {
      const prismaUserRepository = new PrismaUserRepository();

      const createUserUseCase = new CreateUserUseCase(prismaUserRepository);

      const { name, email, password, avatar, secondName }: CreateUserDTO =
        request.body;

      const user = await createUserUseCase.execute({
        email,
        name,
        secondName,
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

  async authenticate(request: Request, response: Response) {
    try {
      const prismaUserRepository = new PrismaUserRepository();
      const authenticateUseCase = new AuthenticateUseCase(prismaUserRepository);

      const { email, password }: AuthenticateDTO = request.body;

      const token = await authenticateUseCase.execute({
        email,
        password,
      });

      return response.status(201).send({ token });
    } catch (err) {
      if (err instanceof ErrorCreditalsInvalid) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }

  async getUser(request: Request, response: Response) {
    try {
      const { id } = request.user;

      const prismaUserRepository = new PrismaUserRepository();
      const getUserUseCase = new GetUserUseCase(prismaUserRepository);

      const user = await getUserUseCase.execute(id);

      return response.status(201).send(user);
    } catch (err) {
      if (err instanceof ErrorUserAlreadyExist) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }
}
