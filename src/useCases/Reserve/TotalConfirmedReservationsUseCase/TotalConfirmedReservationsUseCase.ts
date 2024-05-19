import { IReserveRepository } from "@/repositories/Reserve/IReserveRepository";

export class TotalConfirmedReservations {
  constructor(private reserveRepository: IReserveRepository) {}

  async execute() {
    const reserve = await this.reserveRepository.TotalConfirmedReservations();

    return reserve;
  }
}
