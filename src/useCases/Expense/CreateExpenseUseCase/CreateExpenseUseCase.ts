import { IExpenseRepository } from "@/repositories/Expense/IExpenseRepository";
import { CreateExpenseDTO } from "./CreateExpenseDTO";
import { parseCurrencyToNumber } from "@/utils/NumberConverte";

export class CreateExpenseUseCase {
  constructor(private expenseRepository: IExpenseRepository) {}

  async execute({
    createdAt,
    name,
    userId,
    value,
    userName,
  }: CreateExpenseDTO) {
    const newValue = parseCurrencyToNumber(value);

    const expense = await this.expenseRepository.create({
      createdAt,
      name,
      userId,
      value: newValue.toString(),
      userName,
    });

    return expense;
  }
}
