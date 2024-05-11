import { IRoomRepository } from "@/repositories/Room/IRoomRepository";
import { CreateRoomDTO } from "./CreateRoomDTO";

export class CreateRoomUseCase {
  constructor(private roomRepository: IRoomRepository) {}

  async execute(data: CreateRoomDTO) {
    const room = await this.roomRepository.create({
      name: data.name,
      userId: data.userId,
    });

    return room;
  }
}
