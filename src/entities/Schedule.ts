import { uuid } from "uuidv4";
import { Room } from "./Room";

export class Schedule {
  public readonly id?: string;
  public name: string;
  public checkIn: Date;
  public checkOut: Date;
  public value: string;
  public FromWhere: string;
  public status: string;
  public createdAt?: Date;
  public userId: string;
  public room: Room[]

  constructor(props: Omit<Schedule, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
