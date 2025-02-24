import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";


const ExpenseSummary = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5000/api/expenses/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const categorizedData = response.data.reduce((acc, expense) => {
          acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
          return acc;
        }, {});

        setData(categorizedData);
      } catch (error) {
        console.error("Error fetching expenses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#FF5733", "#DAF7A6", "#9B59B6", "#3498DB"
        ],
        hoverOffset: 6,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="expense-summary-container">
      <h2 className="summary-title">📊 Expense Summary (Category-wise)</h2>
      {loading ? (
        <p className="loading-text">⏳ Loading chart...</p>
      ) : Object.keys(data).length > 0 ? (
        <div className="chart-wrapper">
          <Pie data={chartData} />
        </div>
      ) : (
        <p className="no-data-text">🚫 No expenses to display. Add some expenses to see the summary!</p>
      )}
    </div>
  );
};

export default ExpenseSummary;

