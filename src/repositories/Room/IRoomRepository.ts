import { Room } from "@/entities/Room";

export interface IRoomRepository {
  create(data: Room): Promise<Room>;
}
