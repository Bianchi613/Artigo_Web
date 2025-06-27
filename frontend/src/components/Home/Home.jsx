import { useNavigate } from "react-router-dom";
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h1 className="home-title">Bem-vindo ao Sistema Acadêmico</h1>
      <p className="home-desc">
        Este é um sistema acadêmico completo, com backend em NestJS + Sequelize/PostgreSQL e frontend em React, Axios, JSX, CSS e Tailwind.
      </p>
      <button className="home-btn" onClick={() => navigate('/login')}>Entrar</button>
    </div>
  );
}
