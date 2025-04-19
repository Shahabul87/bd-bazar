export const formatPrice = (price: number | string | null) => {
  if (!price) return "$0.00";
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(price));
};