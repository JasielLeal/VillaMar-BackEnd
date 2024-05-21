import { IExpenseRepository } from "@/repositories/Expense/IExpenseRepository";
import { parseNumberToCurrency } from "@/utils/NumberForMoney";

export class TotalMonthsExpensesUseCase {
  constructor(private expensesRepostory: IExpenseRepository) {}

  async execute({month}) {
    const expense = await this.expensesRepostory.totalMonthsExpenses(month);

    return parseNumberToCurrency(Number(expense))
  }
}
