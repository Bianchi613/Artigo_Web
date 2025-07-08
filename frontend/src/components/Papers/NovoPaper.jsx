import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NovoPaper() {
  const [titulo, setTitulo] = useState("");
  const [pdf, setPdf] = useState(null);
  const [autores, setAutores] = useState("");
  const [conferencias, setConferencias] = useState([]);
  const [conferenciaId, setConferenciaId] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Buscar conferências cadastradas ao montar o componente
  useEffect(() => {
    const fetchConferencias = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/conferencia", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Garante que sempre será um array e ordena por título
        const lista = Array.isArray(res.data) ? res.data : [];
        lista.sort((a, b) => (a.titulo || '').localeCompare(b.titulo || ''));
        setConferencias(lista);
      } catch (err) {
        setConferencias([]);
      }
    };
    fetchConferencias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      // Envio com arquivo PDF
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append(
        "autores",
        JSON.stringify(autores.split(",").map((a) => ({ nome: a.trim() }))),
      );
      if (pdf) formData.append("pdf", pdf);

      // 1. Cadastrar o paper
      const paperRes = await axios.post("http://localhost:3000/papers", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const paperId = paperRes.data?.id;

      // 2. Criar submissão (paper-conf) se conferência selecionada
      if (conferenciaId && paperId) {
        await axios.post(
          "http://localhost:3000/submissoes",
          {
            paperId,
            conferenciaId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      setSucesso("Paper cadastrado com sucesso!");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setErro("Erro ao cadastrar paper.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Novo Paper</h2>
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
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Autores (separados por vírgula)"
          value={autores}
          onChange={(e) => setAutores(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={conferenciaId}
          onChange={(e) => setConferenciaId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Selecione a Conferência</option>
          {conferencias.length === 0 && (
            <option disabled value="">Nenhuma conferência cadastrada</option>
          )}
          {conferencias.map((conf) => (
            <option key={conf.id} value={conf.id}>
              {conf.titulo}
              {conf.data ? ` (${new Date(conf.data).toLocaleDateString()})` : ""}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-700 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
