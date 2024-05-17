import { IUserRepository } from "@/repositories/User/IUserRepository";

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return user;
  }
}
