import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      // IMPORTANT
      localStorage.setItem(
        "email",
        email
      );

      alert("Login Successful");

      navigate("/profile");

    } catch (error) {

      alert("Invalid Credentials");

    }

  };

  return (
    <div>

      <h2>Login</h2>

      <form onSubmit={loginUser}>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;