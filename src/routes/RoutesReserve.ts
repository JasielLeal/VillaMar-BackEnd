import { authenticated } from "@/middleware/isAuthenticated";
import { ReserveController } from "@/useCases/Reserve/ReserveController";
import { Router } from "express";

const reserveController = new ReserveController();

export const routesReserve = Router();

routesReserve.post("/create", authenticated, reserveController.create);

routesReserve.get("/:day", reserveController.FindByDay);

routesReserve.post("/updatestatus", reserveController.UpdateStatus);
