import { PrismaExpenseRepository } from "@/repositories/Expense/PrismaExpenseRepository";
import { Request, Response } from "express";
import { CreateExpenseUseCase } from "./CreateExpenseUseCase/CreateExpenseUseCase";
import { CreateExpenseDTO } from "./CreateExpenseUseCase/CreateExpenseDTO";
import { GetAllDTO } from "./GetAllUseCase/GetAllDTO";
import { GetAllUseCase } from "./GetAllUseCase/GetAllUseCase";

export class ExpenseController {
  async CreateExpense(request: Request, response: Response) {
    try {
      const { createdAt, name, value }: CreateExpenseDTO = request.body;
      const userId = request.user.id;
      const userName = request.user.name;

      const expenseRepository = new PrismaExpenseRepository();
      const createExpenseUseCase = new CreateExpenseUseCase(expenseRepository);

      const expense = await createExpenseUseCase.execute({
        createdAt,
        name,
        userId,
        value,
        userName,
      });

      return response.status(201).send(expense);
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }

  async GetAll(request: Request, response: Response) {
    try {
      const { take, skip, month } = request.query;
      const prismaExpenseRepository = new PrismaExpenseRepository();
      const getAllUseCase = new GetAllUseCase(prismaExpenseRepository);

      const expense = await getAllUseCase.execute({ take, skip, month });

      return response.status(201).send(expense);
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }
}
