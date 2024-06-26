import { uuid } from "uuidv4";

export class Reserve {
  public readonly id?: string;
  public name: string;
  public userName: string;
  public roomName: string;
  public cpf: string;
  public status: boolean;
  public statusReseva: string;
  public checkIn: Date;
  public checkOut: Date;
  public value: string;
  public FromWhere: string;
  public createdAt?: Date;
  public userId: string;

  constructor(props: Omit<Reserve, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
