import { PrismaReserveRepository } from "@/repositories/Reserve/PrismaReserveRepository";
import { Request, Response } from "express";
import { CreateReserveUseCase } from "./CreateReserveUseCase/CreateReserveUseCase";
import { CreateReserveDTO } from "./CreateReserveUseCase/CreateReserveDTO";
import { PrismaRoomRepository } from "@/repositories/Room/PrismaRoomRepository";

export class ReserveController {
  async create(request: Request, response: Response) {
    try {
      const prismaReserveRepository = new PrismaReserveRepository();
      const prismaRoomRepository = new PrismaRoomRepository();
      const createReserveUseCase = new CreateReserveUseCase(
        prismaReserveRepository,
        prismaRoomRepository
      );

      const {
        FromWhere,
        checkIn,
        checkOut,
        name,
        roomId,
        status,
        value,
      }: CreateReserveDTO = request.body;
      const userId = request.user.id;

      const reserve = await createReserveUseCase.execute({
        checkIn,
        checkOut,
        FromWhere,
        name,
        roomId,
        status,
        userId,
        value,
      });

      return response.status(201).send(reserve);
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }
}
