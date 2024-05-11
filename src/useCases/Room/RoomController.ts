import { PrismaRoomRepository } from "@/repositories/Room/PrismaRoomRepository";
import { Request, Response } from "express";
import { CreateRoomUseCase } from "./CreateRoomUseCase/CreateRoomUseCase";
import { CreateRoomDTO } from "./CreateRoomUseCase/CreateRoomDTO";
import { ErrorUserAlreadyNotExist } from "@/erros/ErrorUserAlreadyExist";

export class RoomController {
  async Create(request: Request, response: Response) {
    try {
      const { name }: CreateRoomDTO = request.body;

      const prismaRoomRepository = new PrismaRoomRepository();

      const createRoomUseCase = new CreateRoomUseCase(prismaRoomRepository);

      const userId = request.user.id;

      if (!userId) {
        throw new ErrorUserAlreadyNotExist();
      }

      const room = await createRoomUseCase.execute({
        name,
        userId,
      });

      return response.status(201).send(room);
    } catch (err) {
      if (err instanceof ErrorUserAlreadyNotExist) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }
}
