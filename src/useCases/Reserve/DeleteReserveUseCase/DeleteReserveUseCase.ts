import { IReserveRepository } from "@/repositories/Reserve/IReserveRepository";
import { DeleteReserveDTO } from "./DeleteReserveDTO";
import { ErrorReserveNotFound } from "@/erros/Reserve/ErrorReserveNotFound";

export class DeleteReserveUseCase {
  constructor(private reserveRepository: IReserveRepository) {}

  async execute({ id }: DeleteReserveDTO) {
    const reserve = await this.reserveRepository.findById(id);

    if (!reserve) {
      throw new ErrorReserveNotFound();
    }

    await this.reserveRepository.delete(id)

    return reserve;
  }
}
