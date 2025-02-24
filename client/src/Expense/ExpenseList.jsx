import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';


const ExpenseList = () => {
    const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);
    const [updatedExpense, setUpdatedExpense] = useState({ amount: "", category: "", description: "", date: "" });
    const [totalSpending, setTotalSpending] = useState(0);

    useEffect(() => {
        fetchExpenses();
        fetchTotalSpending();
    }, []);

    const fetchExpenses = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get("https://expense-tracker-backend-v1v3.onrender.com/api/expenses/all", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expenses", error);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`https://expense-tracker-backend-v1v3.onrender.com/api/expenses/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Expense Deleted successfully!");
            setExpenses(expenses.filter((expense) => expense._id !== id));
        } catch (error) {
            console.error("Error deleting expense", error);
        }
    };

    const handleEdit = (expense) => {
        setEditingExpense(expense._id);
        setUpdatedExpense({ ...expense });
    };

    const handleChange = (e) => {
        setUpdatedExpense({ ...updatedExpense, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(`https://expense-tracker-backend-v1v3.onrender.com/api/expenses/update/${editingExpense}`, updatedExpense, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditingExpense(null);
            fetchExpenses();
        } catch (error) {
            console.error("Error updating expense", error);
        }
    };

    const fetchTotalSpending = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get("https://expense-tracker-backend-v1v3.onrender.com/api/expenses/total/monthly", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTotalSpending(response.data.totalAmount);
        } catch (error) {
            console.error("Error fetching total monthly spending", error);
        }
    };

    return (
        <div className="expense-list-container">
            <h2 className="expense-list-title">📅 Your Expenses</h2>
            <div className="total-spending-card">
                💰 <strong>Total Spending This Month:</strong> ${totalSpending}
            </div>
            <ul className="expense-list">
                {expenses.map((expense) => (
                    <li className="expense-item" key={expense._id}>
                        {editingExpense === expense._id ? (
                            <div className="expense-edit-form">
                                <input type="number" name="amount" value={updatedExpense.amount} onChange={handleChange} />
                                <input type="text" name="category" value={updatedExpense.category} onChange={handleChange} />
                                <input type="text" name="description" value={updatedExpense.description} onChange={handleChange} />
                                <input type="date" name="date" value={updatedExpense.date.split("T")[0]} onChange={handleChange} />
                                <div className="action-buttons">
                                    <button className="save-btn" onClick={handleUpdate}>💾 Save</button>
                                    <button className="cancel-btn" onClick={() => setEditingExpense(null)}>❌ Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="expense-card">
                                <p>💵 <strong>Amount:</strong> ${expense.amount}</p>
                                <p>🗂️ <strong>Category:</strong> {expense.category}</p>
                                <p>📝 <strong>Description:</strong> {expense.description}</p>
                                <p>📅 <strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
                                <div className="action-buttons">
                                    <button className="edit-btn" onClick={() => handleEdit(expense)}>✏️ Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(expense._id)}>🗑️ Delete</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;


