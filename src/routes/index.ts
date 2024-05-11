import { Router } from "express";
import { routesUser } from "./RoutesUser";
import { routesRoom } from "./RoutesRoom";
import { routesReserve } from "./RoutesReserve";

export const routes = Router();

routes.use("/user", routesUser);
routes.use('/room', routesRoom)
routes.use('/reserve', routesReserve)
