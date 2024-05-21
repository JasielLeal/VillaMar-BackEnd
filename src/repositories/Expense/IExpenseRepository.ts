import { Expense } from "@/entities/Expense";

export interface IExpenseRepository {
  create(data: Expense): Promise<Expense | null>;
}
