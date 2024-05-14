export interface CreateReserveDTO {
  id?: string;
  name: string;
  roomId: string;
  status: boolean;
  cpf: string;
  checkIn: Date;
  checkOut: Date;
  value: string;
  FromWhere: string;
  createdAt?: Date;
  userId: string;
}
