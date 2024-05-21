import { uuid } from "uuidv4";

export class Expenses {
  public readonly id?: string;
  public name: string;
  public value: string;
  public createdAt: Date;
  public userId: string;

  constructor(props: Omit<Expenses, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
