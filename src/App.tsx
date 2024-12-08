import { useState } from 'react';
import { DebtCounter } from './components/DebtCounter';
import { DebtChart } from './components/DebtChart';
import './styles/index.css';

// Datos de ejemplo - Reemplazar con datos reales
const currentYear = new Date().getFullYear();
const startYear = 1924;

const generateMockMonthlyData = (year: number) => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    totalDebt: 100000000000 + (i * 1000000000),
    population: 45000000 + (i * 10000),
    debtPerCapita: 2222.22 + (i * 100),
    inflationAdjusted: 2500.00 + (i * 100),
  }));
};

const mockData = Array.from({ length: currentYear - startYear + 1 }, (_, i) => {
  const year = startYear + i;
  const factor = Math.pow(1.1, i); // Crecimiento exponencial más realista
  return {
    year,
    totalDebt: 100000000000 * factor,
    population: 45000000 * (1 + (i * 0.01)),
    debtPerCapita: 2222.22 * factor,
    inflationAdjusted: 2500.00 * factor,
    monthlyData: generateMockMonthlyData(year),
  };
});

function App() {
  const [birthYear, setBirthYear] = useState(2020);
  const [adjustForInflation, setAdjustForInflation] = useState(true);
  const [viewType, setViewType] = useState<'yearly' | 'monthly'>('yearly');
  const [selectedMonth, setSelectedMonth] = useState<number>(1);

  const currentDebt = mockData.find(d => d.year === birthYear) || mockData[0];

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const handleViewTypeChange = (type: 'yearly' | 'monthly') => {
    setViewType(type);
    if (type === 'monthly' && !currentDebt.monthlyData) {
      setViewType('yearly');
    }
  };

  return (
    <div className="container">
      <h1>DEUDÓMETRO ARGENTINO</h1>
      
      <div className="view-toggle">
        <button
          className={viewType === 'yearly' ? 'active' : ''}
          onClick={() => handleViewTypeChange('yearly')}
        >
          Vista Anual
        </button>
        <button
          className={viewType === 'monthly' ? 'active' : ''}
          onClick={() => handleViewTypeChange('monthly')}
        >
          Vista Mensual
        </button>
      </div>

      <div className="controls">
        <label>
          Año de nacimiento:
          <select 
            value={birthYear} 
            onChange={(e) => setBirthYear(Number(e.target.value))}
          >
            {mockData.map(d => (
              <option key={d.year} value={d.year}>{d.year}</option>
            ))}
          </select>
        </label>

        {viewType === 'monthly' && (
          <label>
            Mes:
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              {months.map((month, index) => (
                <option key={index + 1} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </label>
        )}
        
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={adjustForInflation}
            onChange={(e) => setAdjustForInflation(e.target.checked)}
          />
          <span>Ajustar por inflación</span>
        </label>
      </div>

      <DebtCounter 
        birthYear={birthYear}
        currentDebt={
          viewType === 'monthly' && currentDebt.monthlyData
            ? { ...currentDebt, ...currentDebt.monthlyData[selectedMonth - 1] }
            : currentDebt
        }
      />
      
      <DebtChart 
        data={viewType === 'monthly' ? currentDebt.monthlyData : mockData}
        adjustedForInflation={adjustForInflation}
        viewType={viewType}
      />
    </div>
  );
}

export default App;
