import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VisualizarPaper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState(null);
  const [erro, setErro] = useState("");
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ titulo: "", url: "", referencia: "" });
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function fetchPaper() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/papers/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPaper(res.data);
        setForm({
          titulo: res.data.titulo || "",
          url: res.data.url || "",
          referencia: res.data.referencia || "",
        });
      } catch (err) {
        setErro("Não foi possível carregar o paper.");
      }
    }
    fetchPaper();
  }, [id]);

  if (erro) return <div className="p-8 text-red-500">{erro}</div>;
  if (!paper) return <div className="p-8">Carregando...</div>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSalvar = async () => {
    setSalvando(true);
    setErro("");
    try {
      const token = localStorage.getItem("token");
      const autoresIds = paper.autores?.map((a) => a.id) || [];
      const res = await axios.put(
        `http://localhost:3000/papers/${paper.id}`,
        { ...form, autoresIds },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setPaper(res.data);
      setEditando(false);
    } catch (err) {
      setErro("Erro ao salvar alterações.");
    } finally {
      setSalvando(false);
    }
  };

  const handleDeletar = async () => {
    if (!window.confirm("Tem certeza que deseja deletar este paper?")) return;
    setSalvando(true);
    setErro("");
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/papers/${paper.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/dashboard");
    } catch (err) {
      setErro("Erro ao deletar paper.");
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
          paper.titulo
        )}
      </h2>
      <p className="mb-2">
        <b>ID:</b> {paper.id}
      </p>
      <p className="mb-2">
        <b>Autores:</b> {paper.autores?.map((a) => a.nome).join(", ") || "-"}
      </p>
      <p className="mb-2">
        <b>Referência:</b>{" "}
        {editando ? (
          <input
            name="referencia"
            value={form.referencia}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
        ) : (
          paper.referencia || "-"
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
            href={paper.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Ver PDF
          </a>
        )}
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
              onClick={() => {
                setEditando(false);
                setForm({
                  titulo: paper.titulo,
                  url: paper.url,
                  referencia: paper.referencia || "",
                });
              }}
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
