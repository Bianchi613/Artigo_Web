import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErro("Preencha usuário e senha");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: username,
        senha: password,
      });
      localStorage.setItem("token", response.data.access_token);

      // Se o backend retornar o usuário junto com o token
      if (response.data.user || response.data.usuario) {
        localStorage.setItem("usuario", JSON.stringify(response.data.user || response.data.usuario));
      } else {
        // Se não retornar, buscar o perfil do usuário autenticado
        try {
          const perfilRes = await axios.get("http://localhost:3000/usuarios/me", {
            headers: { Authorization: `Bearer ${response.data.access_token}` }
          });
          localStorage.setItem("usuario", JSON.stringify(perfilRes.data));
        } catch (perfilErr) {
          // Se não conseguir buscar o perfil, apenas continue
        }
      }

      navigate("/dashboard");
    } catch (err) {
      setErro("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 border rounded"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? "" : ""}
          </button>
        </div>
        {erro && <div className="text-red-500 mb-4">{erro}</div>}
        <button type="submit" className="w-full bg-gray-800 text-white p-3 rounded hover:bg-gray-900">
          Entrar
        </button>
      </form>
    </div>
  );
}
