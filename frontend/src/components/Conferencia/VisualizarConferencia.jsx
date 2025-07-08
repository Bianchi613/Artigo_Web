import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VisualizarConferencia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [conf, setConf] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function fetchConf() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/conferencia/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConf(res.data);
      } catch (err) {
        setErro("Não foi possível carregar a conferência.");
      }
    }
    fetchConf();
  }, [id]);

  if (erro) return <div className="p-8 text-red-500">{erro}</div>;
  if (!conf) return <div className="p-8">Carregando...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{conf.titulo}</h2>
      <p className="mb-2">
        <b>ID:</b> {conf.id}
      </p>
      <p className="mb-2">
        <b>Link:</b>{" "}
        <a
          href={conf.url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          {conf.url}
        </a>
      </p>
      <p className="mb-2">
        <b>Atualizado em:</b> {new Date(conf.atualizado_em).toLocaleString()}
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
