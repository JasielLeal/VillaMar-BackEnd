import { PrismaReserveRepository } from "@/repositories/Reserve/PrismaReserveRepository";
import { Request, Response } from "express";
import { CreateReserveUseCase } from "./CreateReserveUseCase/CreateReserveUseCase";
import { CreateReserveDTO } from "./CreateReserveUseCase/CreateReserveDTO";
import { ReservationsOfTheDayUseCase } from "./ReservationsOfTheDay/ReservationsOfTheDayUseCase";
import { ErrorDayNotFound } from "@/erros/Reserve/ErrorDayNotFound";
import { UpdateStatusUseCase } from "./UpdateStatus/UpdateStatusUseCase";
import { DeleteReserveUseCase } from "./DeleteReserveUseCase/DeleteReserveUseCase";
import { ErrorReserveNotFound } from "@/erros/Reserve/ErrorReserveNotFound";
import { TotalMonthlyBookingUseCase } from "./totalMonthlyBookingUseCase/totalMonthlyBookingUseCase";
import { TotalMonthlyAmountUseCase } from "./TotalMonthlyAmountUseCase/TotalMonthlyAmountUseCase";
import { TotalConfirmedReservations } from "./TotalConfirmedReservationsUseCase/TotalConfirmedReservationsUseCase";
import { MonthlyBookingsByChannelUseCase } from "./MonthlyBookingsByChannelUseCase/MonthlyBookingsByChannelUseCase";

export class ReserveController {
  async create(request: Request, response: Response) {
    try {
      const prismaReserveRepository = new PrismaReserveRepository();
      const createReserveUseCase = new CreateReserveUseCase(
        prismaReserveRepository
      );

      const {
        FromWhere,
        checkIn,
        checkOut,
        name,
        value,
        cpf,
        status,
        roomName,
        statusReseva,
      }: CreateReserveDTO = request.body;

      const userId = request.user.id;
      const userName = request.user.name;

      const reserve = await createReserveUseCase.execute({
        checkIn,
        checkOut,
        FromWhere,
        name,
        cpf,
        userId,
        value,
        status,
        roomName,
        userName,
        statusReseva,
      });

      return response.status(201).send(reserve);
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }

  async FindByDay(request: Request, response: Response) {
    const { day } = request.params;
    if (!day) {
      throw new ErrorDayNotFound();
    }

    try {
      const prismaReserveRepository = new PrismaReserveRepository();
      const reservationsOfTheDayUseCase = new ReservationsOfTheDayUseCase(
        prismaReserveRepository
      );

      const reserves = await reservationsOfTheDayUseCase.execute({
        day,
      });

      return response.status(201).send(reserves);
    } catch (err) {
      if (err instanceof ErrorDayNotFound) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }

  async UpdateStatus(request: Request, response: Response) {
    const { id } = request.body;
    try {
      const prismaReserveRepository = new PrismaReserveRepository();
      const updateStatusUseCase = new UpdateStatusUseCase(
        prismaReserveRepository
      );

      const reserve = await updateStatusUseCase.execute({ id });

      return response.status(201).send(reserve);
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }

  async Delete(request: Request, response: Response) {
    const { id } = request.body;

    try {
      const prismaReserveRepository = new PrismaReserveRepository();
      const deleteReserveUseCase = new DeleteReserveUseCase(
        prismaReserveRepository
      );

      await deleteReserveUseCase.execute({ id });

      return response.status(201).send();
    } catch (err) {
      if (err instanceof ErrorReserveNotFound) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }

  async totalMonthlyBooking(request: Request, response: Response) {
    try {
      const prismaReserveRepository = new PrismaReserveRepository();
      const totalMonthlyBookingUseCase = new TotalMonthlyBookingUseCase(
        prismaReserveRepository
      );

      const reserves = await totalMonthlyBookingUseCase.execute();

      return response.status(201).send(reserves);
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }

  async TotalMonthlyAmount(request: Request, response: Response) {
    try {
      const { month } = request.query;
      const prismaReserveRepository = new PrismaReserveRepository();
      const totalMonthlyAmount = new TotalMonthlyAmountUseCase(
        prismaReserveRepository
      );

      const reserves = await totalMonthlyAmount.execute({ month });
      return response.status(201).send(reserves);
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }

  async TotalConfirmedReservations(request: Request, response: Response) {
    try {
      const prismaReserveRepository = new PrismaReserveRepository();
      const totalConfirmedReservationsUseCase = new TotalConfirmedReservations(
        prismaReserveRepository
      );

      const reserves = await totalConfirmedReservationsUseCase.execute();

      return response.status(201).send(reserves);
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }

  async MonthlyBookingsByChannel(request: Request, response: Response) {
    try {
      const prismaReserveRepository = new PrismaReserveRepository();
      const monthlyBookingsByChannelUseCase =
        new MonthlyBookingsByChannelUseCase(prismaReserveRepository);

      const reservers = await monthlyBookingsByChannelUseCase.execute();

      return response.status(201).send(reservers);
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }
}
