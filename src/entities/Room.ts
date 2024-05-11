import { uuid } from "uuidv4";

export class Room {
  public readonly id?: string;
  public name: string;
  public userId: string;

  constructor(props: Omit<Room, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
