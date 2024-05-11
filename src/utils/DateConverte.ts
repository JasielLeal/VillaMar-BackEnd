export class DateConverter {
  static toISO(date: string | Date): string {
    if (typeof date === 'string') {
      // Se a entrada for uma string, faça a conversão para o formato ISO-8601
      const [dayStr, monthStr, yearStr] = date.split('/');
      const day = dayStr ? dayStr.padStart(2, '0') : '';
      const month = monthStr ? monthStr.padStart(2, '0') : '';
      const year = yearStr ? yearStr : '';
      const isoDate = `${year}-${month}-${day}`;
      return isoDate;
    } else {
      // Se a entrada for um objeto Date, converta-o para ISO-8601
      return date.toISOString().split('T')[0];
    }
  }
}
