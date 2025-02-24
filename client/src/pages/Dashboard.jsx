import AddExpense from '../Expense/AddExpense.jsx';
import ExpenseList from '../Expense/ExpenseList.jsx';
import ExpenseSummary from "../Expense/ExpenseSummary.jsx";
import ViewExpenses from "../Expense/ViewExpense.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Dashboard = () => {

    const notify = (message) => toast.success(message, { position: "top-right", autoClose: 3000 });

    return (
        // <div className={`dashboard-container ${darkMode ? "dark" : "light"}`}>
        < div className = "dashboard-container">
            <header className="dashboard-header">
                <h1>💸 Expense Tracker Dashboard</h1>
                <p>Manage your expenses efficiently with ease.</p>
            </header>

            <div className="dashboard-grid">
                <AddExpense notify={notify} />
                <ExpenseList notify={notify} />
                <ViewExpenses notify={notify} />
                <ExpenseSummary />
            </div>

            <ToastContainer />
        </div>
    );
};

export default Dashboard;





