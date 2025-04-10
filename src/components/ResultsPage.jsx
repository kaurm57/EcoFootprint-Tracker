import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { calculateCarbonFootprint } from '../utils/calculateFootprint';
import PieChart from './PieChart';
import BarChart from './BarChart';
import { Link } from 'react-router-dom';

// Average Canadian data (tonnes CO₂e/year)
const averageData = {
  Food: 3200,         // in kg CO₂e/year (3 tonnes)
  Transport: 5600,    // in kg CO₂e/year (7 tonnes)
  Household: 4000,    // in kg CO₂e/year (6 tonnes) per person
  Goods: 3200,           // You can adjust if you want a specific figure for goods,
  Total: 16000,       // total average (16 tonnes)
};

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Assume the form page passed the "answers" object via state.
  const { answers } = location.state || {};

  if (!answers) {
    navigate('/form');
    return null;
  }

  // Now, use the calculate function from our separate file.
  const result = calculateCarbonFootprint(answers);

  // For insights, simply determine the highest category contribution.
  const categoryContributions = [
    { category: 'Food', value: result.CF_Food },
    { category: 'Transport', value: result.CF_Transport },
    { category: 'Household', value: result.CF_Household },
    { category: 'Goods', value: result.CF_Goods }
  ];
  const highest = categoryContributions.reduce((a, b) => a.value > b.value ? a : b);

  const insights = {
    Food: "Consider reducing red meat and dairy consumption. Try incorporating more plant-based meals.",
    Transport: "Look into carpooling, public transit or even cycling; consider upgrading to a more efficient vehicle.",
    Household: "Improve home insulation and switch to energy-efficient appliances. Lower your heating and cooling needs.",
    Goods: "Reduce non-essential purchases and opt for sustainable brands whenever possible."
  };

  return (
    <div className="min-h-screen flex flex-col gap-[1rem] bg-[#e6e5d1] p-[1rem]">
      <nav className="flex justify-between items-center">
        <div className="left-5">
          <Link to="/">
            <span className="text-2xl font-bold text-green-800 hover:text-green-700">
              EcoFootprint
            </span>
          </Link>
        </div>      
        <span className="text-3xl font-bold text-center">Your Dashboard</span>
        <button
            onClick={() => navigate('/form')}
            className="bg-green-800 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          >
            Edit Answers
          </button>
      </nav>
      {/* Grid layout with 4 quadrants */}
      <div className="grid grid-cols-2 gap-[1rem]">
        {/* Quadrant 1: Summary / Answer */}
        <div className="bg-white p-4 rounded shadow flex flex-col items-start justify-start gap-[2rem]">
          <h3 className="text-2xl font-bold mb-2 text-gray-950">Your Calculations</h3>
          <div className="flex flex-col items-start text-lg text-gray-600">
          <p><strong>Food & Diet:</strong> {result.CF_Food.toFixed(2)} kg CO₂e/year</p>
          <p><strong>Transport:</strong> {result.CF_Transport.toFixed(2)} kg CO₂e/year</p>
          <p><strong>Household:</strong> {result.CF_Household.toFixed(2)} kg CO₂e/year</p>
          <p><strong>Goods:</strong> {result.CF_Goods.toFixed(2)} kg CO₂e/year</p>
          </div>
          <p className="text-xl font-bold text-[#cf7553]">
            Total per person: {result.totalCF_person.toFixed(2)} kg CO₂e/year
          </p>
          <p className="text-sm text-gray-600">
            (~{(result.totalCF_person / 1000).toFixed(2)} metric tons)
          </p>
        </div>
        {/* Quadrant 2: Pie Chart */}
        <div className="flex flex-col bg-white p-4 rounded shadow justify-between">
          <h3 className="text-2xl font-bold mb-4 text-gray-950">Your Breakdown</h3>
          <div className="flex justify-center w-full">
            <PieChart data={{
              Food: result.CF_Food,
              Transport: result.CF_Transport,
              Household: result.CF_Household,
              Goods: result.CF_Goods
            }} />
          </div>
        </div>

        {/* Quadrant 3: Bar Chart comparing to average */}
        <div className="bg-white p-4 rounded shadow flex flex-col justify-between">
        <h3 className="text-2xl font-bold mb-2 text-gray-950">Compared to Others</h3>
        <div className='flex justify-center'>
          <BarChart 
              userData={{
                CF_Food: result.CF_Food,
                CF_Transport: result.CF_Transport,
                CF_Household: result.CF_Household,
                CF_Goods: result.CF_Goods,
              }}
              averageData={{
                Food: averageData.Food,
                Transport: averageData.Transport,
                Household: averageData.Household,
                Goods: averageData.Goods,
              }}
            />
        </div>

        </div>
        {/* Quadrant 4: Insights */}
        <div className="bg-white p-4 rounded shadow flex flex-col justify-start gap-[2rem]">
        <h3 className="text-2xl font-bold mb-2 text-gray-950">Insights & Recommendations</h3>
        <p className="text-lg text-gray-600 flex flex-col gap-[2rem]">
            Your highest contribution comes from <span className='flex text-2xl font-bold text-[#e7a955] justify-center'>{highest.category} (
            {highest.value.toFixed(2)} kg CO₂e/year).</span>
          </p>
          <p className="mt-2 text-lg text-gray-700">💡 {insights[highest.category]}</p>
        </div>
      </div>
      <div className="flex justify-center mt-8">

      </div>
    </div>
  );
};

export default ResultsPage;
