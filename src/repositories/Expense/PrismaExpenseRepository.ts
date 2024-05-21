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
      },
    });

    return expense;
  }
}
