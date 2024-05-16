import { IReserveRepository } from "@/repositories/Reserve/IReserveRepository";
import { UpdateStatusDTo } from "./UpdateStatusDTO";

export class UpdateStatusUseCase {
  constructor(private reserveRepository: IReserveRepository) {}

  async execute({ id }: UpdateStatusDTo) {
    const reserveExist = await this.reserveRepository.findById(id);

    if (!reserveExist) {
      throw new Error("Reserva não existe");
    }

    const reserve = await this.reserveRepository.updateStatus(id);

    return reserve;
  }
}
