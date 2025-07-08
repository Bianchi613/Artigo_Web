import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NovoPaper() {
  const [titulo, setTitulo] = useState("");
  const [pdf, setPdf] = useState(null);
  const [autores, setAutores] = useState("");
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
      // Envio com arquivo PDF
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append(
        "autores",
        JSON.stringify(autores.split(",").map((a) => ({ nome: a.trim() }))),
      );
      if (pdf) formData.append("pdf", pdf);

      await axios.post("http://localhost:3000/papers", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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
