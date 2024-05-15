import { Reserve } from "@/entities/Reserve";
import { IReserveRepository } from "./IReserveRepository";
import { prisma } from "@/middleware/lib/prisma";

export class PrismaReserveRepository implements IReserveRepository {
  async create(data: Reserve): Promise<Reserve> {
    const reserve = await prisma.reserve.create({
      data: {
        name: data.name,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        FromWhere: data.FromWhere,
        cpf: data.cpf,
        status: data.status,
        value: data.value,
        userId: data.userId,
        roomName: data.roomName,
        userName: data.userName,
        statusReseva: data.statusReseva,
      },
    });

    return reserve;
  }

  async findByDay(day: string): Promise<Reserve[]> {
    const reserves = await prisma.reserve.findMany({
      where: {
        checkIn: day,
      },
    });

    return reserves;
  }
}
