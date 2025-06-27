
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<div style={{padding:'2rem',textAlign:'center'}}><h1>Dashboard</h1><p>Login realizado com sucesso!</p></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
