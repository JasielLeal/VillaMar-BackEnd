import { Expense } from "@/entities/Expense";

export interface IExpenseRepository {
  create(data: Expense): Promise<Expense | null>;
  getAll(skip: number, take: number, month: string): Promise<Expense[] | null>;
  totalMonthsExpenses(month: string): Promise<string | null>;
  findById(id: string): Promise<Expense | null>;
  delete(id: string): Promise<Expense | null>;
}
