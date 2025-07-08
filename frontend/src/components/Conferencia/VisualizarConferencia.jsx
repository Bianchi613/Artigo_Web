import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VisualizarConferencia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [conf, setConf] = useState(null);
  const [erro, setErro] = useState("");
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ titulo: "", url: "", data: "" });
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function fetchConf() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/conferencia/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConf(res.data);
        setForm({
          titulo: res.data.titulo || "",
          url: res.data.url || "",
          data: res.data.data ? res.data.data.slice(0, 10) : "",
        });
      } catch (err) {
        setErro("Não foi possível carregar a conferência.");
      }
    }
    fetchConf();
  }, [id]);

  if (erro) return <div className="p-8 text-red-500">{erro}</div>;
  if (!conf) return <div className="p-8">Carregando...</div>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSalvar = async () => {
    setSalvando(true);
    setErro("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:3000/conferencia/${conf.id}`,
        { ...form },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setConf(res.data);
      setEditando(false);
    } catch (err) {
      setErro("Erro ao salvar alterações.");
    } finally {
      setSalvando(false);
    }
  };

  const handleDeletar = async () => {
    if (!window.confirm("Tem certeza que deseja deletar esta conferência?")) return;
    setSalvando(true);
    setErro("");
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/conferencia/${conf.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/dashboard");
    } catch (err) {
      setErro("Erro ao deletar conferência.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {editando ? (
          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
        ) : (
          conf.titulo
        )}
      </h2>
      <p className="mb-2">
        <b>ID:</b> {conf.id}
      </p>
      <p className="mb-2">
        <b>Data:</b>{" "}
        {editando ? (
          <input
            name="data"
            type="date"
            value={form.data}
            onChange={handleChange}
            className="border p-1 rounded"
          />
        ) : (
          conf.data ? new Date(conf.data).toLocaleDateString() : "-"
        )}
      </p>
      <p className="mb-2">
        <b>Link:</b>{" "}
        {editando ? (
          <input
            name="url"
            value={form.url}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
        ) : (
          <a
            href={conf.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            {conf.url}
          </a>
        )}
      </p>
      <p className="mb-2">
        <b>Atualizado em:</b> {new Date(conf.atualizado_em).toLocaleString()}
      </p>
      <div className="flex gap-2 mt-6">
        {!editando ? (
          <>
            <button
              onClick={() => setEditando(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Editar
            </button>
            <button
              onClick={handleDeletar}
              className="bg-red-600 text-white px-4 py-2 rounded"
              disabled={salvando}
            >
              Deletar
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSalvar}
              className="bg-green-600 text-white px-4 py-2 rounded"
              disabled={salvando}
            >
              Salvar
            </button>
            <button
              onClick={() => { setEditando(false); setForm({ titulo: conf.titulo, url: conf.url, data: conf.data ? conf.data.slice(0, 10) : "" }); }}
              className="bg-gray-400 text-white px-4 py-2 rounded"
              disabled={salvando}
            >
              Cancelar
            </button>
          </>
        )}
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white px-4 py-2 rounded ml-auto"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
