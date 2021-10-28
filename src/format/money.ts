export const formatMoney = (
  value: number,
  currency: string = 'CNY',
  locale: string = 'en-US',
  options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
): string => {
  const formatter = new Intl.NumberFormat(locale, options);
  return formatter.format(value);
};
