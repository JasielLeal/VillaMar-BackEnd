import { authenticated } from "@/middleware/isAuthenticated";
import { RoomController } from "@/useCases/Room/RoomController";
import { Router } from "express";

const roomController = new RoomController();

export const routesRoom = Router();

routesRoom.post("/create", authenticated, roomController.Create);
