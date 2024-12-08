import { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/calculations';
import { DebtData } from '../types';

interface DebtCounterProps {
  birthYear: number;
  currentDebt: DebtData;
}

export const DebtCounter = ({ birthYear, currentDebt }: DebtCounterProps) => {
  const [displayAmount, setDisplayAmount] = useState(currentDebt.debtPerCapita);

  useEffect(() => {
    setDisplayAmount(currentDebt.debtPerCapita);
  }, [currentDebt]);

  return (
    <div className="debt-counter">
      <h2>Tu deuda al nacer ({birthYear})</h2>
      <div className="amount">{formatCurrency(displayAmount)}</div>
      <p className="description">
        Ajustado por inflación al {new Date().getFullYear()}
      </p>
    </div>
  );
}; 