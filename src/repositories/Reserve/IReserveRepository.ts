import { Reserve } from "@/entities/Reserve";

export interface IReserveRepository {
  create(data: Reserve): Promise<Reserve | null>;
  findById(id: string): Promise<Reserve | null>;
  findByDay(day: string): Promise<Reserve[] | null>;
  updateStatus(id: string): Promise<Reserve | null>;
  delete(id: string): Promise<Reserve | null>;
  totalMonthlyBooking(): Promise<string>;
  totalMonthlyAmount(month: string): Promise<string>;
  TotalConfirmedReservations(): Promise<string>;
  MonthlyBookingsByChannel(): Promise<{ company: string; value: number }[]>;
}
