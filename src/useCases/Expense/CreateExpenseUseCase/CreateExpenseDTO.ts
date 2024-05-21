export interface CreateExpenseDTO {
  readonly id?: string;
  name: string;
  value: string;
  createdAt: Date;
  userId: string;
  userName: string;
}
