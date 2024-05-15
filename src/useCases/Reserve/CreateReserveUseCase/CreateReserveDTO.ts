export interface CreateReserveDTO {
  id?: string;
  name: string;
  userName: string;
  roomName?: string;
  status: boolean;
  statusReseva: string;
  cpf: string;
  checkIn: Date;
  checkOut: Date;
  value: string;
  FromWhere: string;
  createdAt?: Date;
  userId: string;
}
