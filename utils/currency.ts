export const format = (value: number) => {
  // Crear formateador
  const formatter = new Intl.NumberFormat('es-Ar', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return formatter.format(value);
};