import {useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");     
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://expense-tracker-backend-v1v3.onrender.com/api/auth/register", { name, email, password });
            navigate("/login");
        } catch (error) {
            console.error("Registration error", error);
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Create Your Account 💸</h2>
                <p className="subtitle">Start tracking your expenses effortlessly!</p>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleRegister} className="register-form">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Register</button>
                </form>
                <p className="login-text">
                    Already have an account?{" "}
                    <span className="login-link" onClick={() => navigate("/login")}>
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;

