import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Configuracoes() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({ nome: "", email: "", lattes: "", perfil: "" });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [salvando, setSalvando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const token = localStorage.getItem("token");
        let userId = id;
        if (!userId) {
          userId = localStorage.getItem("userId");
        }
        if (!userId) {
          setErro("Usuário não encontrado.");
          return;
        }
        const res = await axios.get(`http://localhost:3000/usuarios/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuario(res.data);
        setForm({
          nome: res.data.nome || "",
          email: res.data.email || "",
          lattes: res.data.lattes || "",
          perfil: res.data.perfil || "",
        });
      } catch (err) {
        setErro("Não foi possível carregar os dados do usuário.");
      }
    }
    fetchUsuario();
  }, [id]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    setSalvando(true);
    setErro("");
    setSucesso("");
    try {
      const token = localStorage.getItem("token");
      let userId = id;
      if (!userId) {
        userId = localStorage.getItem("userId");
      }
      await axios.put(
        `http://localhost:3000/usuarios/${userId}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSucesso("Dados atualizados com sucesso!");
    } catch (err) {
      setErro("Erro ao salvar alterações.");
    } finally {
      setSalvando(false);
    }
  };

  if (erro) return <div className="p-8 text-red-500">{erro}</div>;
  if (!usuario) return <div className="p-8">Carregando...</div>;

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Configurações da Conta</h2>
      {sucesso && <div className="text-green-600 mb-2">{sucesso}</div>}
      <form onSubmit={handleSalvar} className="space-y-4">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="lattes"
          placeholder="Lattes"
          value={form.lattes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="perfil"
          value={form.perfil}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Selecione o perfil</option>
          <option value="cliente">Cliente</option>
          <option value="administrador">Administrador</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-700 text-white p-2 rounded"
          disabled={salvando}
        >
          {salvando ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
