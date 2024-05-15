import { Router } from "express";
import { routesUser } from "./RoutesUser";
import { routesReserve } from "./RoutesReserve";

export const routes = Router();

routes.use("/user", routesUser);
routes.use('/reserve', routesReserve)
