import { authenticated } from "@/middleware/isAuthenticated";
import { ExpenseController } from "@/useCases/Expense/ExpenseController";
import { Router } from "express";

const expenseController = new ExpenseController();
export const routesExpense = Router();

routesExpense.post("/create", authenticated, expenseController.CreateExpense);
routesExpense.get("/month", authenticated, expenseController.GetAll);
