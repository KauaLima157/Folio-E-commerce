import { useState } from "react";
import { Inputs } from "./Inputs.js";
import { Submit } from "./Submit.js";
import { AuthService } from "../services/authService";
import { useNavigate } from "react-router-dom";

const authService = new AuthService();

export function FormRegister() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccess("Conta criada com sucesso!");
    setLoading(true);
    setError("");
    
    try {
      const response = await authService.signUp(name, email, password);

      console.log("Usuário criado:", response);

      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);

    } catch (error: any) {
      setError(error.message);
      setSuccess("Problemas ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Junte-se a nós</h2>
        <Inputs
          type="text"
          name="name"
          id="name"
          placeholder="Digite seu nome"
          textLabel="Nome"
          handleChange={(e) => setName(e.target.value)}
          />
        <Inputs
          type="email"
          name="email"
          id="email"
          placeholder="Digite seu email"
          textLabel="Email"
          handleChange={(e) => setEmail(e.target.value)}
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z"
                />
            </svg>
          }
          />
        <Inputs
          type="password"
          name="password"
          id="password"
          placeholder="Digite sua senha"
          textLabel="Senha"
          handleChange={(e) => setPassword(e.target.value)}
          isPassword
          />

        <Submit value={loading ? "Carregando..." : "Enviar"} disabled={loading}/>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
}

export function FormLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccess("Login realizado com sucesso!");
    setLoading(true);
    setError("");

    try {
      const response = await authService.login(email, password);

      localStorage.setItem("token", JSON.stringify(response.token))

      console.log("Login feito: ", response);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: any) {
      setError(error.message);
      setSuccess("Problemas ao acessar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <h2>Bem-vindo(a) de volta!</h2>
        <Inputs
          type="email"
          name="email"
          id="email"
          placeholder="Digite seu emial"
          textLabel="Email"
          handleChange={(e) => setEmail(e.target.value)}
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z"
                />
            </svg>
          }
          />
        <Inputs
          type="password"
          name="password"
          id="password"
          placeholder="Digite sua senha"
          textLabel="Senha"
          handleChange={(e) => setPassword(e.target.value)}
          isPassword
          />

        <Submit value={loading ? "Carregando..." : "Enviar"} disabled={loading} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
  );
}