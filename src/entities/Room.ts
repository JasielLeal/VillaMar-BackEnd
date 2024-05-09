import { uuid } from "uuidv4";

export class Room {
  public readonly id?: string;
  public name: string;
  public status: string;
  public scheduleId: string

  constructor(props: Omit<Room, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
