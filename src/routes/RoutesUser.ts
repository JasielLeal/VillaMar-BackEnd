import { authenticated } from "@/middleware/isAuthenticated";
import { UserController } from "@/useCases/User/UserController";
import { Router } from "express";

const userController = new UserController();

export const routesUser = Router();

routesUser.post("/", authenticated, userController.create);