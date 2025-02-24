import { useState } from "react";
import axios from "axios";


const ViewExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filtered, setFiltered] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchExpenses = async () => {
        try {
            if (!startDate || !endDate) {
                alert("⚠️ Please select both Start Date and End Date.");
                setExpenses([]);
                setFiltered(false);
                return;
            }
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get("https://expense-tracker-backend-v1v3.onrender.com/api/expenses/filtered", {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    startDate: new Date(startDate).toISOString().split("T")[0],
                    endDate: new Date(endDate).toISOString().split("T")[0],
                },
            });
            setExpenses(response.data);
            setFiltered(true);
        } catch (error) {
            console.error("Error fetching expenses", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="view-expense-container">
            <h2 className="view-title">📅 Filter Expenses by Date Range</h2>
            <div className="filter-section">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="date-input"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="date-input"
                />
                <button className="filter-btn" onClick={fetchExpenses}>
                    🔍 Apply Filter
                </button>
            </div>

            {loading ? (
                <p className="loading-text">⏳ Loading expenses...</p>
            ) : filtered ? (
                expenses.length > 0 ? (
                    <ul className="filtered-expense-list">
                        {expenses.map((expense) => (
                            <li className="filtered-expense-card" key={expense._id}>
                                <p>💵 <strong>Amount:</strong> ${expense.amount}</p>
                                <p>🗂️ <strong>Category:</strong> {expense.category}</p>
                                <p>📝 <strong>Description:</strong> {expense.description}</p>
                                <p>📅 <strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-expense-msg">🚫 No expenses found for the selected date range.</p>
                )
            ) : (
                <p className="instruction-msg">🔍 Select a date range and click *Apply Filter* to view expenses.</p>
            )}
        </div>
    );
};

export default ViewExpenses;
