import { useState } from "react";
import axios from "axios";
import "./UserRegister.css";

export default function UserRegister() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lattes, setLattes] = useState("");
  const [perfil, setPerfil] = useState("cliente");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!nome || !email || !senha || !perfil) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/usuarios", {
        nome,
        email,
        senha,
        lattes,
        perfil,
      });

      if (response.status === 201) {
        setSucesso("Usuário cadastrado com sucesso!");
        setNome("");
        setEmail("");
        setSenha("");
        setLattes("");
        setPerfil("cliente");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 400) {
        setErro("Dados inválidos. Verifique os campos e tente novamente.");
      } else {
        setErro("Erro ao cadastrar usuário. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Cadastro de Usuário</h2>

        {erro && <div className="error-message">{erro}</div>}
        {sucesso && <div className="success-message">{sucesso}</div>}

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <input
          type="url"
          placeholder="Link do Currículo Lattes"
          value={lattes}
          onChange={(e) => setLattes(e.target.value)}
        />

        <select
          value={perfil}
          onChange={(e) => setPerfil(e.target.value)}
        >
          <option value="cliente">Cliente</option>
          <option value="administrador">Administrador</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar Usuário"}
        </button>
      </form>
    </div>
  );
}
