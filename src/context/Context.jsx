//Creo mi clase contexto 
import { createContext } from "react";

export    const estadoInicial = {
  id_proyecto: "",
  desc_proyecto: "",
  usuario : "",
  baseURL: "",
  id_sector:"",
  actividad: [],
};

const Context = createContext( estadoInicial)

export default Context