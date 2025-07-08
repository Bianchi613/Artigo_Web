import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [dados, setDados] = useState({
    totalUsuarios: 0,
    totalPapers: 0,
    totalConferencias: 0,
    totalSubmissoes: 0,
    ultimosPapers: [],
    ultimasConferencias: [],
    submissoes: [],
    conferencias: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };

    async function fetchDados() {
      try {
        const [usuariosRes, papersRes, confsRes, subsRes] = await Promise.all([
          axios.get("http://localhost:3000/usuarios", { headers }),
          axios.get("http://localhost:3000/papers", { headers }),
          axios.get("http://localhost:3000/conferencia", { headers }),
          axios.get("http://localhost:3000/paper-conf", { headers }),
        ]);

        setDados({
          totalUsuarios: usuariosRes.data.length,
          totalPapers: papersRes.data.length,
          totalConferencias: confsRes.data.length,
          totalSubmissoes: subsRes.data.length,
          ultimosPapers: papersRes.data.sort((a, b) => b.id - a.id).slice(0, 5),
          ultimasConferencias: confsRes.data
            .sort((a, b) => new Date(b.atualizado_em) - new Date(a.atualizado_em))
            .slice(0, 5),
          submissoes: subsRes.data,
          conferencias: confsRes.data,
        });
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    }
    fetchDados();
  }, [navigate]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>
      <Sidebar />
      <main style={{ flex: 1 }}>
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Painel Acadêmico</h1>
        <p className="text-gray-600">Visão geral do sistema acadêmico</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          titulo="Usuários"
          valor={dados.totalUsuarios}
          icone="fa-user"
          cor="blue"
        />
        <Card
          titulo="Papers"
          valor={dados.totalPapers}
          icone="fa-file-alt"
          cor="green"
        />
        <Card
          titulo="Conferências"
          valor={dados.totalConferencias}
          icone="fa-university"
          cor="purple"
        />
        <Card
          titulo="Submissões"
          valor={dados.totalSubmissoes}
          icone="fa-upload"
          cor="yellow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Últimos Papers */}
        <section className="bg-white rounded-lg shadow overflow-auto">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Últimos Papers
            </h3>
            <button
              onClick={() => navigate("/papers/novo")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              <i className="fas fa-plus mr-2"></i> Novo Paper
            </button>
          </div>
          {dados.ultimosPapers.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <i className="fas fa-file-alt text-4xl mb-3"></i>
              <p className="text-lg font-medium">Nenhum paper cadastrado</p>
            </div>
          ) : (
            <table className="styled-table w-full text-left text-sm text-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Título</th>
                  <th className="px-4 py-2">Autores</th>
                  <th className="px-4 py-2">Submissões</th>
                  <th className="px-4 py-2">PDF</th>
                </tr>
              </thead>
              <tbody>
                {dados.ultimosPapers.map((paper) => {
                  // Submissões deste paper
                  const subs = dados.submissoes.filter(sub => sub.paper_id === paper.id);
                  return (
                    <tr
                      key={paper.id}
                      className="hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate(`/papers/${paper.id}`)}
                    >
                      <td className="px-4 py-2">{paper.id}</td>
                      <td className="px-4 py-2">{paper.titulo}</td>
                      <td className="px-4 py-2">{paper.autores.map((autor) => autor.nome).join(", ") || "-"}</td>
                      <td className="px-4 py-2">
                        {subs.length === 0 ? (
                          <span className="text-gray-400">Nenhuma submissão</span>
                        ) : (
                          subs.map(sub => {
                            const conf = dados.conferencias.find(c => c.id === sub.conferencia_id);
                            return (
                              <div key={sub.id} className="mb-1">
                                <b>{conf?.titulo || "Conferência desconhecida"}</b> — <span className="text-blue-700">{sub.status}</span>
                              </div>
                            );
                          })
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {paper.url ? (
                          <a
                            href={paper.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Ver PDF
                          </a>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>

        {/* Últimas Conferências */}
        <section className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Últimas Conferências
            </h3>
            <button
              onClick={() => navigate("/conferencia/novo")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
            >
              <i className="fas fa-plus mr-2"></i> Nova Conferência
            </button>
          </div>
          {dados.ultimasConferencias.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <i className="fas fa-university text-4xl mb-3"></i>
              <p className="text-lg font-medium">
                Nenhuma conferência cadastrada
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {dados.ultimasConferencias.map((conf) => (
                <li
                  key={conf.id}
                  className="p-6 hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/conferencia/${conf.id}`)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">
                      {conf.titulo}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(conf.atualizado_em).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{conf.url}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
        </div>
      </main>
    </div>
  );
}

function Card({ titulo, valor, icone, cor }) {
  return (
    <div
      className={`bg-white rounded-lg shadow p-6 transition duration-300 ease-in-out transform hover:-translate-y-1`}
    >
      <div className="flex items-center">
        <div className={`p-3 rounded-full bg-${cor}-100 text-${cor}-600`}>
          <i className={`fas ${icone} text-xl`}></i>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{titulo}</p>
          <p className="text-2xl font-semibold text-gray-800">{valor}</p>
        </div>
      </div>
    </div>
  );
}
