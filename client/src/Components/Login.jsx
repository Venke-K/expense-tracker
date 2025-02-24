import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            localStorage.setItem("token", response.data.token);

            // 🎉 Toast greeting after successful login
            toast.success(`Welcome back, ${response.data.name}! 🎉`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setTimeout(() => {
                navigate("/dashboard");
            }, 3000); // Navigate after toast is shown
        } catch (error) {
            console.error("Login error", error);
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <ToastContainer /> {/* 🪄 Toast container for notifications */}
            <div className="login-card">
                <h2>Welcome Back 👋</h2>
                <p className="subtitle">Login to your Expense Tracker</p>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleLogin} className="login-form">
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
                    <button type="submit">Login</button>
                </form>
                <p className="register-text">
                    Don&apos;t have an account?{" "}
                    <span className="register-link" onClick={() => navigate("/signup")}>
                        Register Now
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
