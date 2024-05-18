export function parseCurrencyToNumber(currency: string): number {
  // Remove o símbolo de moeda e outros caracteres não numéricos
  const numericString = currency.replace(/[^\d,]/g, "").replace(",", ".");
  // Converte a string resultante em um número
  const numberValue = parseFloat(numericString);
  // Multiplica por 100 para voltar ao formato original (centavos)
  return Math.round(numberValue * 100);
}
