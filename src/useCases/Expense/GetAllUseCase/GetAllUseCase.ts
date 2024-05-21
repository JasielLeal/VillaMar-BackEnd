import { IExpenseRepository } from "@/repositories/Expense/IExpenseRepository";

export class GetAllUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute({ take, skip, month }) {

    const expenses = await this.expenseRepository.getAll(take, skip, month);

    return expenses;
  }
}
