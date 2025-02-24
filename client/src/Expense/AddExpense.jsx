import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';


const AddExpense = () => {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            await axios.post(
                "https://expense-tracker-backend-v1v3.onrender.com/api/expenses/add",
                { amount, category, description, date: new Date(date).toISOString() },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setAmount("");
            setCategory("");
            setDescription("");
            setDate("");
            toast.success("Expense added successfully!");
        } catch (error) {
            console.error("Error adding expense", error);
            toast.error("Failed to add expense!");
        }
    };

    return (
        <div className="expense-container">
            <h2 className="expense-title">💵 Add New Expense</h2>
            <form className="expense-form" onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="💰 Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="🗂️ Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <textarea
                    placeholder="📝 Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button type="submit">➕ Add Expense</button>
            </form>
        </div>
    );
};

export default AddExpense;

