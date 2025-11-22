import { Routes, Route } from "react-router-dom";
import Home from "./pages/homepage";
import "./index.css";
import Perfil from "./pages/perfil";
import PerfilAdm from "./pages/perfilAdm";
import Login from "./pages/login";
import Sobre from "./pages/sobre";
import ListaTestes from "./pages/listatestes";
import TesteDetalhe from "./pages/testedetalhe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/perfilAdm" element={<PerfilAdm />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/listaTestes" element={<ListaTestes />} />
      <Route path="/listaTestes/:id" element={<TesteDetalhe />} />

    </Routes>
  );
}

export default App;
