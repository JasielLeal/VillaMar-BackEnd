import { IUserRepository } from "@/repositories/User/IUserRepository";
import { CreateUserDTO } from "./CreateUserDTO";
import { ErrorUserAlreadyNotExist } from "@/erros/ErrorUserAlreadyExist";
import { ErrorUserAlreadyExist } from "@/erros/ErrorUserAlreadyNotExist";
import { hash } from "bcryptjs";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO) {
    const userAlreadyExist = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExist) {
      throw new ErrorUserAlreadyExist();
    }

    const passwordHash = await hash(data.password, 6)

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: passwordHash,
      avatar: data.avatar,
      isOwner: data.isOwner,
      createdAt: data.createdAt,
    });

    return { user, password: undefined };
  }
}
