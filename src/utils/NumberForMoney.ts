export function parseNumberToCurrency(number: number): string {
  // Converte o número de centavos para reais
  const reais = number / 100;
  // Formata o número como moeda brasileira
  return reais.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
