export interface MonthlyDebtData {
  month: number; // 1-12
  totalDebt: number;
  population: number;
  debtPerCapita: number;
  inflationAdjusted: number;
}

export interface YearlyDebtData {
  year: number;
  totalDebt: number;
  population: number;
  debtPerCapita: number;
  inflationAdjusted: number;
  monthlyData: MonthlyDebtData[];
}

export interface DebtData extends YearlyDebtData {}

export interface ChartOptions {
  year: number;
  adjustForInflation: boolean;
  viewType: 'yearly' | 'monthly';
  selectedMonth?: number;
} 