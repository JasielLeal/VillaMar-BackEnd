export interface CreateReserveDTO {
  id?: string;
  name: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  value: string;
  FromWhere: string;
  createdAt?: Date;
  userId: string;
}
