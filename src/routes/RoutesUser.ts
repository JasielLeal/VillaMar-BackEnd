import { authenticated } from "@/middleware/isAuthenticated";
import { UserController } from "@/useCases/User/UserController";
import { Router } from "express";

const userController = new UserController();

export const routesUser = Router();

routesUser.post("/", userController.create);
routesUser.post("/session", userController.authenticate);
routesUser.get("/getuser", authenticated, userController.getUser);
