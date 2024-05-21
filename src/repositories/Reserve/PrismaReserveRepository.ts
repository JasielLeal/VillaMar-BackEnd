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
        id,
      },
    });

    return reserve;
  }

  async totalMonthlyBooking(): Promise<string> {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    ); // Fim do último dia do mês

    const reserves = await prisma.reserve.count({
      where: {
        statusReseva: "Finalizado",

        // Filtrar as reservas criadas ou atualizadas no mês atual
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    return reserves.toString();
  }

  async totalMonthlyAmount(month: string): Promise<string> {
    let startDate: Date;
    let endDate: Date;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    if (month) {
      // Se o mês foi fornecido, calcular o primeiro e último dia do mês
      startDate = new Date(`${currentYear}-${month}-01`);

      endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
    } else {
      // Se o mês não foi fornecido, usar o mês atual
      const currentDate = new Date();
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    } // Fim do último dia do mês

    const reserve = await prisma.reserve.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        value: true,
      },
    });

    const total = reserve.reduce(
      (sum, reserve) => sum + Number(reserve.value),
      0
    );

    return total.toString();
  }

  async TotalConfirmedReservations(): Promise<string> {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    ); // Fim do último dia do mês

    const reserves = await prisma.reserve.count({
      where: {
        statusReseva: "Reservado",

        // Filtrar as reservas criadas ou atualizadas no mês atual
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    return reserves.toString();
  }

  async MonthlyBookingsByChannel(): Promise<
    { company: string; value: number }[]
  > {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );

    const totalOrdersByCompany = [
      {
        company: "WhatsApp",
        value: await prisma.reserve.count({
          where: {
            FromWhere: "WhatsApp",
            createdAt: { gte: firstDayOfMonth, lte: lastDayOfMonth },
          },
        }),
      },
      {
        company: "Airbnb",
        value: await prisma.reserve.count({
          where: {
            FromWhere: "Airbnb",
            createdAt: { gte: firstDayOfMonth, lte: lastDayOfMonth },
          },
        }),
      },
      {
        company: "Booking",
        value: await prisma.reserve.count({
          where: {
            FromWhere: "Booking",
            createdAt: { gte: firstDayOfMonth, lte: lastDayOfMonth },
          },
        }),
      },
    ];

    return totalOrdersByCompany;
  }
}
