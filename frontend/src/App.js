import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import UserRegister from "./components/UserRegister/UserRegister.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import NovoPaper from "./components/Papers/NovoPaper.jsx";
import VisualizarPaper from "./components/Papers/VisualizarPaper.jsx";
import NovaConferencia from "./components/Conferencia/NovaConferencia.jsx";
import VisualizarConferencia from "./components/Conferencia/VisualizarConferencia.jsx";
import Configuracoes from "./components/Configuracoes/Configuracoes.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-usuario" element={<UserRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/papers/novo" element={<NovoPaper />} />
        <Route path="/papers/:id" element={<VisualizarPaper />} />
        <Route path="/conferencia/novo" element={<NovaConferencia />} />
        <Route path="/conferencia/:id" element={<VisualizarConferencia />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
