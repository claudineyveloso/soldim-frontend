import React from "react";
import { NumericFormat, NumberFormatValues } from "react-number-format";

interface MoneyInputProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  id?: string;
  name?: string;
}

const MoneyInput: React.FC<MoneyInputProps> = ({
  value,
  onChange,
  className,
  id,
  name,
}) => {
  // Função para lidar com mudanças de valor
  const handleValueChange = (values: NumberFormatValues) => {
    // Verifique se floatValue não é undefined
    if (values.floatValue !== undefined) {
      onChange(values.floatValue);
    }
  };

  return (
    <NumericFormat
      value={value}
      onValueChange={handleValueChange}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false} // opcional, para evitar valores negativos
      // Você pode usar customInput se precisar de um input estilizado:
      // customInput={YourCustomInputComponent}
      className={className}
      id={id}
      name={name}
      inputMode="numeric"
    />
  );
};

export default MoneyInput;
