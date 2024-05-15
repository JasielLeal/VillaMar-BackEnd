export class DateConverter {
  static toISO(date: string | Date): string {
    if (typeof date === 'string') {
      // Se a entrada for uma string, faça a conversão para o formato ISO-8601
      const [dayStr, monthStr, yearStr] = date.split('/');
      const day = dayStr ? dayStr.padStart(2, '0') : '';
      const month = monthStr ? monthStr.padStart(2, '0') : '';
      const year = yearStr ? yearStr : '';
      const isoDate = `${year}-${month}-${day}T03:00:00.000Z`; // Definindo a hora para 03:00:00
      return isoDate;
    } else {
      // Se a entrada for um objeto Date, ajuste a hora para 03:00:00 e converta para ISO-8601
      const adjustedDate = new Date(date);
      adjustedDate.setUTCHours(3); // Ajustando a hora para 03:00:00
      return adjustedDate.toISOString();
    }
  }
}
