

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";



export default function NovoPaper() {

  const [titulo, setTitulo] = useState("");
  const [url, setUrl] = useState("");
  const [pdf, setPdf] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [autoresSelecionados, setAutoresSelecionados] = useState([]);
  const [conferencias, setConferencias] = useState([]);
  const [conferenciaId, setConferenciaId] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Buscar conferências e usuários cadastrados ao montar o componente
  useEffect(() => {
    const fetchConferencias = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/conferencia", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Garante que sempre será um array e ordena por título
        const lista = Array.isArray(res.data) ? res.data : [];
        lista.sort((a, b) => (a.titulo || "").localeCompare(b.titulo || ""));
        setConferencias(lista);
      } catch (err) {
        setConferencias([]);
      }
    };
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/usuarios", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarios(res.data);
      } catch (err) {
        setUsuarios([]);
      }
    };
    fetchConferencias();
    fetchUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    // Validação simples
    if (!titulo.trim()) {
      setErro("O título é obrigatório.");
      return;
    }
    if (!conferenciaId) {
      setErro("Selecione uma conferência.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      // Garante que o usuário logado sempre será autor
      let autoresIds = [Number(userId)];
      // Adiciona outros autores selecionados (sem duplicar o logado)
      autoresSelecionados.forEach((id) => {
        if (id && Number(id) !== Number(userId) && !autoresIds.includes(Number(id))) {
          autoresIds.push(Number(id));
        }
      });

      // Monta o corpo da requisição

      const data = {
        titulo,
        referencia: "",
        url,
        pdf: pdf || null,
        autoresIds,
      };

      const paperRes = await axios.post(
        "http://localhost:3000/papers",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const paperId = paperRes.data?.id;

      // 2. Criar submissão (paper-conf) se conferência selecionada
      if (conferenciaId && paperId) {
        await axios.post(
          "http://localhost:3000/paper-conf",
          {
            paperId,
            conferenciaId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      }

      setSucesso("Paper cadastrado com sucesso!");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      // Tenta mostrar mensagem detalhada do backend
      if (err.response && err.response.data && err.response.data.message) {
        setErro(Array.isArray(err.response.data.message) ? err.response.data.message.join(" ") : err.response.data.message);
      } else {
        setErro("Erro ao cadastrar paper.");
      }
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
          className={`w-full p-2 border rounded ${erro && !titulo.trim() ? 'border-red-500' : ''}`}
        />
        <input
          type="text"
          placeholder="URL do PDF (opcional)"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={e => setPdf(e.target.files[0] || null)}
          className="w-full p-2 border rounded"
        />
        <label className="block font-medium">Autores adicionais:</label>
        <select
          multiple
          value={autoresSelecionados}
          onChange={e => {
            const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
            setAutoresSelecionados(options);
          }}
          className="w-full p-2 border rounded h-32"
        >
          {usuarios
            .filter(u => String(u.id) !== String(localStorage.getItem("userId")))
            .map(u => (
              <option key={u.id} value={u.id}>
                {u.nome} ({u.email})
              </option>
            ))}
        </select>
        <select
          value={conferenciaId}
          onChange={(e) => setConferenciaId(e.target.value)}
          className={`w-full p-2 border rounded ${erro && !conferenciaId ? 'border-red-500' : ''}`}
        >
          <option value="">Selecione a Conferência</option>
          {conferencias.length === 0 && (
            <option disabled value="">
              Nenhuma conferência cadastrada
            </option>
          )}
          {conferencias.map((conf) => (
            <option key={conf.id} value={conf.id}>
              {conf.titulo}
              {conf.data
                ? ` (${new Date(conf.data).toLocaleDateString()})`
                : ""}
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
