import { IReserveRepository } from "@/repositories/Reserve/IReserveRepository";
import { ReservationsOfTheDayDTO } from "./ReservationsOfTheDayDTO";

export class ReservationsOfTheDayUseCase {
  constructor(private reserveRepository: IReserveRepository) {}

  async execute({ day }: ReservationsOfTheDayDTO) {
    const reserves = await this.reserveRepository.findByDay(day);

    return reserves
  }
}
