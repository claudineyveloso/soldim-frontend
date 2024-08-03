const formatCurrency = (value: number | string): string => {
  if (typeof value === "string") {
    value = parseFloat(value.replace(/[^\d.-]/g, ""));
  }
  if (isNaN(value)) {
    return "";
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};

export default formatCurrency;
