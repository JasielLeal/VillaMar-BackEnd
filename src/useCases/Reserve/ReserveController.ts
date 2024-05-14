import { PrismaReserveRepository } from "@/repositories/Reserve/PrismaReserveRepository";
import { Request, Response } from "express";
import { CreateReserveUseCase } from "./CreateReserveUseCase/CreateReserveUseCase";
import { CreateReserveDTO } from "./CreateReserveUseCase/CreateReserveDTO";
import { PrismaRoomRepository } from "@/repositories/Room/PrismaRoomRepository";
import { ReservationsOfTheDayUseCase } from "./ReservationsOfTheDay/ReservationsOfTheDayUseCase";
import { ErrorDayNotFound } from "@/erros/Reserve/ErrorDayNotFound";

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
        value,
        cpf,
        status
      }: CreateReserveDTO = request.body;
      const userId = request.user.id;

      const reserve = await createReserveUseCase.execute({
        checkIn,
        checkOut,
        FromWhere,
        name,
        roomId,
        cpf,
        userId,
        value,
        status
      });

      return response.status(201).send(reserve);
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }

  async FindByDay(request: Request, response: Response){

    const {day} = request.params
    if(!day){
      throw new ErrorDayNotFound()
    }

    try{

      const prismaReserveRepository = new PrismaReserveRepository()
      const reservationsOfTheDayUseCase = new ReservationsOfTheDayUseCase(prismaReserveRepository)

      const reserves = await reservationsOfTheDayUseCase.execute({
        day
      })

      return response.status(201).send(reserves)

    }catch (err) {

      if(err instanceof ErrorDayNotFound){
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }
}
