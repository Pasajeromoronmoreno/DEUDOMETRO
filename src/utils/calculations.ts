import { DebtData } from '../types';

export const calculateDebtPerCapita = (totalDebt: number, population: number): number => {
  return totalDebt / population;
};

export const adjustForInflation = (amount: number, baseYear: number, targetYear: number, inflationData: Record<number, number>): number => {
  const inflationFactor = inflationData[targetYear] / inflationData[baseYear];
  return amount * inflationFactor;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}; 