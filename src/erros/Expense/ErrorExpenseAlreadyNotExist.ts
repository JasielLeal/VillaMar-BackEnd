export class ErrorExpenseAlreadyNotExist extends Error {
  constructor() {
    super("Despesa não encontrada");
  }
}
