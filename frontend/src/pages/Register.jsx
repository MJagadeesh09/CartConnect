import { useState } from "react";
import API from "../api/axios";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/api/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert(response.data);

    } catch (error) {

      alert(error.response?.data);

    }

  };

  return (
    <div>

      <h2>Register</h2>

      <form onSubmit={registerUser}>

        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

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
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;