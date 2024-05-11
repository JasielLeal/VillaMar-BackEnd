import { Room } from "@/entities/Room";
import { IRoomRepository } from "./IRoomRepository";
import { prisma } from "@/lib/prisma";

export class PrismaRoomRepository implements IRoomRepository {
  async create(data: Room): Promise<Room> {
    const room = await prisma.room.create({
      data: {
        name: data.name,
        userId: data.userId,
      },
    });

    return room;
  }

  async findById(id: string): Promise<Room> {
    
    const reserve = await prisma.room.findUnique({
      where:{
        id
      }
    })
    
    return reserve
  }
}
