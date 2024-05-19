import { IReserveRepository } from "@/repositories/Reserve/IReserveRepository";

export class MonthlyBookingsByChannelUseCase {
  constructor(private reserveRepository: IReserveRepository) {}

  async execute() {
    const reserve = await this.reserveRepository.MonthlyBookingsByChannel();
    return reserve;
  }
}
