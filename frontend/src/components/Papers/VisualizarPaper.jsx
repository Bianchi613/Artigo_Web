import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VisualizarPaper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchPaper() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/papers/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPaper(res.data);
      } catch (err) {
        setErro("Não foi possível carregar o paper.");
      }
    }
    fetchPaper();
  }, [id]);

  if (erro) return <div className="p-8 text-red-500">{erro}</div>;
  if (!paper) return <div className="p-8">Carregando...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{paper.titulo}</h2>
      <p className="mb-2">
        <b>ID:</b> {paper.id}
      </p>
      <p className="mb-2">
        <b>Autores:</b> {paper.autores?.map((a) => a.nome).join(", ") || "-"}
      </p>
      <p className="mb-2">
        <b>Link:</b>{" "}
        <a
          href={paper.url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          Ver PDF
        </a>
      </p>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
      >
        Voltar
      </button>
    </div>
  );
}
