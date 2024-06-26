import { IReserveRepository } from "@/repositories/Reserve/IReserveRepository";
import { CreateReserveDTO } from "./CreateReserveDTO";
import { DateConverter } from "@/utils/DateConverte";
import { parseCurrencyToNumber } from "@/utils/NumberConverte";

export class CreateReserveUseCase {
  constructor(private reserveRepository: IReserveRepository) {}

  async execute({
    FromWhere,
    cpf,
    checkIn,
    checkOut,
    name,
    userId,
    value,
    status,
    userName,
    roomName,
    statusReseva,
  }: CreateReserveDTO) {
    const isoCheckIn = DateConverter.toISO(checkIn);
    const isoCheckOut = DateConverter.toISO(checkOut);

    const newValue = parseCurrencyToNumber(value);

    const reserve = await this.reserveRepository.create({
      checkIn: new Date(isoCheckIn),
      checkOut: new Date(isoCheckOut),
      FromWhere,
      name,
      userId,
      value: newValue.toString(),
      cpf,
      status,
      roomName,
      userName,
      statusReseva,
    });

    return {...reserve}
  }
}
