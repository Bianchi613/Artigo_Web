import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NovaConferencia() {
  const [titulo, setTitulo] = useState("");
  const [url, setUrl] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/conferencia",
        {
          titulo,
          url,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setSucesso("Conferência cadastrada com sucesso!");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setErro("Erro ao cadastrar conferência.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Nova Conferência</h2>
      {erro && <div className="text-red-500 mb-2">{erro}</div>}
      {sucesso && <div className="text-green-600 mb-2">{sucesso}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="url"
          placeholder="URL da conferência"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-purple-700 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
