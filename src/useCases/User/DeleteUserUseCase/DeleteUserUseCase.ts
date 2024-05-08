import { IUserRepository } from "@/repositories/User/IUserRepository";
import { DeleteUserDTO } from "./DeleteUserDTO";
import { ErrorUserAlreadyNotExist } from "@/erros/ErrorUserAlreadyExist";

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ id }: DeleteUserDTO) {
    const userAlreadyExist = await this.userRepository.findById(id);

    if (!userAlreadyExist) {
      throw new ErrorUserAlreadyNotExist();
    }

    await this.userRepository.delete(id);

    return;
  }
}
