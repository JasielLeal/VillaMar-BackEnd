import { PrismaReserveRepository } from "@/repositories/Reserve/PrismaReserveRepository";
import { Request, Response } from "express";
import { CreateReserveUseCase } from "./CreateReserveUseCase/CreateReserveUseCase";
import { CreateReserveDTO } from "./CreateReserveUseCase/CreateReserveDTO";
import { ReservationsOfTheDayUseCase } from "./ReservationsOfTheDay/ReservationsOfTheDayUseCase";
import { ErrorDayNotFound } from "@/erros/Reserve/ErrorDayNotFound";
import { UpdateStatusUseCase } from "./UpdateStatus/UpdateStatusUseCase";

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
}
