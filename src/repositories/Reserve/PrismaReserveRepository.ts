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

  async findById(id: string): Promise<Reserve> {
    const reserve = await prisma.reserve.findUnique({
      where: {
        id,
      },
    });

    return reserve;
  }

  async updateStatus(id: string): Promise<Reserve> {
    const reserve = await prisma.reserve.update({
      where: {
        id,
      },
      data: {
        statusReseva: "Finalizado",
        status: true,
      },
    });

    return reserve;
  }

  async delete(id: string): Promise<Reserve> {

    const reserve = await prisma.reserve.delete({
      where: {
        id
      },
    });

    return reserve;
  }
}
