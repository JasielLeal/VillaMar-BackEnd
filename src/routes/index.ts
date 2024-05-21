import { Router } from "express";
import { routesUser } from "./RoutesUser";
import { routesReserve } from "./RoutesReserve";
import { routesExpense } from "./RoutesExpense";

export const routes = Router();

routes.use("/user", routesUser);
routes.use("/reserve", routesReserve);
routes.use("/expense", routesExpense);
