import { IExpenseRepository } from "@/repositories/Expense/IExpenseRepository";
import { DeleteExpenseDTO } from "./DeleteExpenseDTO";
import { ErrorExpenseAlreadyNotExist } from "@/erros/Expense/ErrorExpenseAlreadyNotExist";

export class DeleteExpenseUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute({ id }: DeleteExpenseDTO) {
    const expenseExist = await this.expenseRepository.findById(id);

    if (!expenseExist) {
      throw new ErrorExpenseAlreadyNotExist();
    }

    const expense = await this.expenseRepository.delete(id);
    return expense;
  }
}
