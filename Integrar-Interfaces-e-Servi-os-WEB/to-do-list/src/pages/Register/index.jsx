import { useState, useRef } from "react";
import "./style.css";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const user = {
      name: inputName.current.value,
      email: inputEmail.current.value,
      password: inputPassword.current.value,
    };

    try {
      await api.post("/api/register", user);
      alert("Registro realizado com sucesso!");
    } catch (error) {
      alert("Erro ao realizar o registro.");
    }
  }

  return (
    <div className="container">
      <a className="login-link" onClick={() => navigate("/login")}>
        Já tem uma conta? Faça login
      </a>
      <form onSubmit={handleSubmit}>
        <h1>Registro de Usuário</h1>
        <input
          type="text"
          placeholder="Nome"
          name="name"
          ref={inputName}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
