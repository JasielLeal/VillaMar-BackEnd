import { IUserRepository } from "@/repositories/User/IUserRepository";
import { DeleteUserDTO } from "./DeleteUserDTO";
import { ErrorUserAlreadyNotExist } from "@/erros/ErrorUserAlreadyExist";
import { ErrorWithoutPermission } from "@/erros/ErrorWithoutPermission";

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ id }: DeleteUserDTO) {
    const userAlreadyExist = await this.userRepository.findById(id);

    if (!userAlreadyExist) {
      throw new ErrorUserAlreadyNotExist();
    }

    if(userAlreadyExist.isOwner == 'Owner'){
      throw new ErrorWithoutPermission()
    }

    await this.userRepository.delete(id);

    return;
  }
}
