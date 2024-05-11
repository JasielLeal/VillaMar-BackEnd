import { Router } from "express";
import { routesUser } from "./RoutesUser";
import { routesRoom } from "./RoutesRoom";

export const routes = Router();

routes.use("/user", routesUser);
routes.use('/room', routesRoom)
