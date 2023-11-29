import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';   

import "./css/index.css";
import "./css/flags.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

/*Componentes */


import BoletaAsignacion from "./pages/BoletaAsignacion"
import MainMenu from './components/MainMenu';
import Login from './pages/Login';
import ProyectoSelector from './pages/ProyectoSelector';

function App() {
  
  return (
    <div className='flex flex-column w-screen'>
      <BrowserRouter>
          <MainMenu />
        <div className='flex justify-content-center flex-wrap w-screen'>
          <Routes>
            <Route path="/App" element={<></>} />
            <Route path="/proyectos" element={<ProyectoSelector />} />
            <Route path="/BoletaAsignacion" element={<BoletaAsignacion />} />
            <Route path="/Login" element={ <Login/> } />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
