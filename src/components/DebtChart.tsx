import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { DebtData, MonthlyDebtData } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DebtChartProps {
  data: DebtData[] | MonthlyDebtData[];
  adjustedForInflation: boolean;
  viewType?: 'yearly' | 'monthly';
}

export const DebtChart = ({ data, adjustedForInflation, viewType = 'yearly' }: DebtChartProps) => {
  const isMonthlyData = viewType === 'monthly';

  const chartData = {
    labels: isMonthlyData 
      ? (data as MonthlyDebtData[]).map(d => `Mes ${d.month}`)
      : (data as DebtData[]).map(d => d.year.toString()),
    datasets: [
      {
        label: `Deuda per cápita ${adjustedForInflation ? '(ajustada por inflación)' : ''}`,
        data: data.map(d => adjustedForInflation ? d.inflationAdjusted : d.debtPerCapita),
        borderColor: 'rgb(234, 67, 53)',
        backgroundColor: 'rgba(234, 67, 53, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Deuda per cápita histórica ${isMonthlyData ? '(mensual)' : '(anual)'} ${adjustedForInflation ? '(ajustada por inflación)' : ''}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => {
            return new Intl.NumberFormat('es-AR', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            }).format(value);
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line options={options} data={chartData} />
    </div>
  );
}; 