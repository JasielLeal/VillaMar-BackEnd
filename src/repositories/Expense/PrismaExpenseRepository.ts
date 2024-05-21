import { Expense } from "@/entities/Expense";
import { IExpenseRepository } from "./IExpenseRepository";
import { prisma } from "@/middleware/lib/prisma";

export class PrismaExpenseRepository implements IExpenseRepository {
  async create(data: Expense): Promise<Expense> {
    const expense = await prisma.expense.create({
      data: {
        name: data.name,
        value: data.value,
        userId: data.userId,
        createdAt: data.createdAt,
        userName: data.userName,
      },
    });

    return expense;
  }

  async getAll(take: number, skip: number, month: string): Promise<Expense[]> {
    let startDate: Date;
    let endDate: Date;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    if (month) {
      // Se o mês foi fornecido, calcular o primeiro e último dia do mês
      startDate = new Date(`${currentYear}-${month}-01`);

      endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
    } else {
      // Se o mês não foi fornecido, usar o mês atual
      const currentDate = new Date();
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    }

    const expenses = await prisma.expense.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      take: Number(take) || 10,
      skip: Number(skip) || 0,
    });

    return expenses;
  }

  async totalMonthsExpenses(month: string): Promise<string> {
    let startDate: Date;
    let endDate: Date;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    
    if (month) {
      startDate = new Date(`${currentYear}-${month}-01`);
      
      endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1);
    } else {
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    }

    const expenses = await prisma.expense.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        value: true,
      },
    });

    const total = expenses.reduce(
      (acc, expense) => acc + parseFloat(expense.value),
      0
    );

    return total.toString();
  }
}
