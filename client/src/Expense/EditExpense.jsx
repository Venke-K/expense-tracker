// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const EditExpense = ({ match, navigate }) => {
//   const [expense, setExpense] = useState({ amount: "", category: "", description: "" });
  

//   useEffect(() => {
//     const fetchExpense = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const response = await axios.get(`http://localhost:5000/api/expenses/${match.params.id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setExpense(response.data);
//       } catch (error) {
//         console.error("Error fetching expense", error);
//       }
//     };

//     fetchExpense();
//   }, [match.params.id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     const navigate = useNavigate();

//     try {
//       await axios.put(
//         `http://localhost:5000/api/expenses/update/${match.params.id}`,
//         expense,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         navigate("/dashboard"); // Redirect to dashboard after update
//     } catch (error) {
//       console.error("Error updating expense", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setExpense((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div>
//       <h2>Edit Expense</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="number"
//           name="amount"
//           placeholder="Amount"
//           value={expense.amount}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="category"
//           placeholder="Category"
//           value={expense.category}
//           onChange={handleChange}
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={expense.description}
//           onChange={handleChange}
//         />
//         <button type="submit">Update Expense</button>
//       </form>
//     </div>
//   );
// };

// export default EditExpense;
