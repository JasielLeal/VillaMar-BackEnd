import { PrismaExpenseRepository } from "@/repositories/Expense/PrismaExpenseRepository";
import { Request, Response } from "express";
import { CreateExpenseUseCase } from "./CreateExpenseUseCase/CreateExpenseUseCase";
import { CreateExpenseDTO } from "./CreateExpenseUseCase/CreateExpenseDTO";

export class ExpenseController {
  async CreateExpense(request: Request, response: Response) {
    try {
      const { createdAt, name, value }: CreateExpenseDTO = request.body;
      const userId = request.user.id;

      const expenseRepository = new PrismaExpenseRepository();
      const createExpenseUseCase = new CreateExpenseUseCase(expenseRepository);

      const expense = await createExpenseUseCase.execute({
        createdAt,
        name,
        userId,
        value,
      });

      return response.status(201).send(expense);
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }
}
