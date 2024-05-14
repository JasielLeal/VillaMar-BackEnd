import { Reserve } from "@/entities/Reserve";
import { IReserveRepository } from "./IReserveRepository";
import { prisma } from "@/lib/prisma";

export class PrismaReserveRepository implements IReserveRepository {
  async create(data: Reserve): Promise<Reserve> {
    const reserve = await prisma.reserve.create({
      data: {
        name: data.name,
        roomId: data.roomId,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        FromWhere: data.FromWhere,
        status: data.status,
        value: data.value,
        userId: data.userId,
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
