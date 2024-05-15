import { Reserve } from "@/entities/Reserve";

export interface IReserveRepository {
  create(data: Reserve): Promise<Reserve | null>;
  findByDay(day: string): Promise<Reserve[] | null>;
}
