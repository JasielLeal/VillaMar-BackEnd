import { authenticated } from "@/middleware/isAuthenticated";
import { ReserveController } from "@/useCases/Reserve/ReserveController";
import { Router } from "express";

const reserveController = new ReserveController();

export const routesReserve = Router();

routesReserve.post("/create", authenticated, reserveController.create);

routesReserve.get("/day/:day", authenticated, reserveController.FindByDay);

routesReserve.post(
  "/updatestatus",
  authenticated,
  reserveController.UpdateStatus
);

routesReserve.delete("/delete", authenticated, reserveController.Delete);

routesReserve.get(
  "/monthlybooking",
  authenticated,
  reserveController.totalMonthlyBooking
);
routesReserve.get(
  "/monthlyamount",
  authenticated,
  reserveController.TotalMonthlyAmount
);
