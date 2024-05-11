import { IReserveRepository } from "@/repositories/Reserve/IReserveRepository";
import { CreateReserveDTO } from "./CreateReserveDTO";
import { IRoomRepository } from "@/repositories/Room/IRoomRepository";
import { ErrorRoomAlreadyNotExist } from "@/erros/Room/ErrorRoomAlreadyNotExist";
import { DateConverter } from "@/utils/DateConverte";

export class CreateReserveUseCase {
  constructor(
    private reserveRepository: IReserveRepository,
    private roomRepository: IRoomRepository
  ) {}

  async execute({
    FromWhere,
    checkIn,
    checkOut,
    name,
    roomId,
    status,
    userId,
    value,
  }: CreateReserveDTO) {
    const roomExist = await this.roomRepository.findById(roomId);

    if (!roomExist) {
      throw new ErrorRoomAlreadyNotExist();
    }

    const isoCheckIn = DateConverter.toISO(checkIn);
    const isoCheckOut = DateConverter.toISO(checkOut);
    console.log(new Date(isoCheckIn));
    console.log(new Date(isoCheckOut));

    const reserve = await this.reserveRepository.create({
      checkIn: new Date(isoCheckIn),
      checkOut: new Date(isoCheckOut),
      FromWhere,
      name,
      roomId,
      status,
      userId,
      value,
    });

    return reserve;
  }
}
