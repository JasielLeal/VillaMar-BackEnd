import { IReserveRepository } from "@/repositories/Reserve/IReserveRepository";

export class TotalMonthlyBookingUseCase {
  constructor(private reserveRepository: IReserveRepository) {}

  async execute() {
    const reserves = await this.reserveRepository.totalMonthlyBooking();

    return reserves;
  }
}
