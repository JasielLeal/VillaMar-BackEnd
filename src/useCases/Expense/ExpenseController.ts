import { PrismaExpenseRepository } from "@/repositories/Expense/PrismaExpenseRepository";
import { Request, Response } from "express";
import { CreateExpenseUseCase } from "./CreateExpenseUseCase/CreateExpenseUseCase";
import { CreateExpenseDTO } from "./CreateExpenseUseCase/CreateExpenseDTO";
import { GetAllUseCase } from "./GetAllUseCase/GetAllUseCase";
import { TotalMonthsExpensesUseCase } from "./TotalMonthsExpenses/TotalMonthsExpenses";
import { ErrorExpenseAlreadyNotExist } from "@/erros/Expense/ErrorExpenseAlreadyNotExist";
import { DeleteExpenseUseCase } from "./DeleteExpenseUseCase/DeleteExpenseUseCase";

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

  async TotalMonthsExpenses(request: Request, response: Response) {
    const { month } = request.query;

    try {
      const expenseRepository = new PrismaExpenseRepository();
      const totalMonthsExpensesUseCase = new TotalMonthsExpensesUseCase(
        expenseRepository
      );

      const expenses = await totalMonthsExpensesUseCase.execute({ month });

      return response.status(201).send(expenses);
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }

  async DeleteExpense(request: Request, response: Response) {
    try {
      const { id } = request.body;
      const prismaExpenseRepository = new PrismaExpenseRepository();
      const deleteExpenseUseCase = new DeleteExpenseUseCase(
        prismaExpenseRepository
      );

      const expense = await deleteExpenseUseCase.execute({id});

      return response.status(201).send(expense);
    } catch (err) {
      if (err instanceof ErrorExpenseAlreadyNotExist) {
        return response.status(400).send({ error: err.message });
      }
      return response.status(500).send({ error: err.message });
    }
  }
}
