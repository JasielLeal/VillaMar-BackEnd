import { IReserveRepository } from "@/repositories/Reserve/IReserveRepository";

export class TotalMonthlyAmountUseCase {
  constructor(private reserveRepository: IReserveRepository) {}

  async execute({month}) {
    const reserve = await this.reserveRepository.totalMonthlyAmount(month);

    const reserveFormated = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(reserve) / 100);

    return reserveFormated;
  }
}
