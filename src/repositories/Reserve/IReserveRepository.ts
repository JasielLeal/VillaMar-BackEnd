import { Reserve } from "@/entities/Reserve";

export interface IReserveRepository {
  create(data: Reserve): Promise<Reserve | null>;
}
