import { IUserRepository } from "@/repositories/User/IUserRepository";
import { CreateUserDTO } from "./CreateUserDTO";
import { ErrorUserAlreadyExist } from "@/erros/ErrorUserAlreadyExist";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO) {
    const userAlreadyExist = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExist) {
      throw new ErrorUserAlreadyExist();
    }

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
      isOwner: data.isOwner,
      createdAt: data.createdAt,
    });

    return { user, password: undefined };
  }
}
