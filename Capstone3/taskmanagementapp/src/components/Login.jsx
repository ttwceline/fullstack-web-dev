import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      navigate("/form");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
        <h1>Login</h1>
        
        {/* FIX: Removed inline style */}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin} className="login-form">
            {/* FIX: Removed <br /> tags */}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
            {/* FIX: Removed inline style */}
            <button type="submit">Login</button>
        </form>
    </div>
  );
};

export default Login;