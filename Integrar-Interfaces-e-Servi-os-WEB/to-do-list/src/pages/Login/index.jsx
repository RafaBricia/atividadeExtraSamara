import { useState, useRef } from "react";
import "./style.css";
import api from "../../services/api"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputEmail = useRef();
  const inputPassword = useRef();


  async function handleLogin(e) {
    e.preventDefault();

    const credentials = {
      email: inputEmail.current.value,
      password: inputPassword.current.value,
    };

    try {
      const response = await api.post("/api/login", credentials);
      const token = response.data.token
      console.log(response.data);
      alert("Login bem-sucedido!");
      localStorage.setItem("authToken", token); // Armazena o token no localStorage
      window.location.href = "/home"; // Redireciona para a tela Home
    } catch (error) {
      alert("Erro ao fazer login.");
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          ref={inputEmail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          name="password"
          ref={inputPassword}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;