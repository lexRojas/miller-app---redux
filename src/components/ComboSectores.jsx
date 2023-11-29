import React, { useContext, useEffect } from "react";
import Context from "../context/Context";
import axios from "axios";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";

export default function ComboSectores() {
  const { baseURL, id_proyecto,set_id_sectores } = useContext(Context);
  const [Sectores, setSectores] = useState([]);
  const [selectedSector, setselectedSector] = useState(null);


  // fijo el sector en el contexto 
  const fijarSectorID = (valor) =>{
    const {codigo_sector} = valor
    set_id_sectores(codigo_sector)
    setselectedSector(valor)
  }

  const get_sectores = async (presupuesto = "") => {
    await axios
      .get(`${baseURL}/tb_sectores`, { params: { presupuesto } })
      .then(function (response) {
        setSectores(response.data);
      })
      .catch(function (error) {
        let result = [
          {
            presupuesto: "999999",
            codigo_sector: "#",
            descripcion: "No hay sectores",
          },
        ];
        setSectores(result);
        console.log("Error en Fetch Get Presupuesto");
        console.log(error);
      });
  };
  useEffect(() => {
    get_sectores(id_proyecto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="grid ml-1 " >
      <label className="text-lg font-bold" htmlFor="cmb_selectores">
        {" "}
        Seleccione un Sector:
      </label>

        <Dropdown
          id="cmdFiltro"
          value={selectedSector}
          onChange={(e) => fijarSectorID(e.value)}
          options={Sectores}
          optionLabel="descripcion"
          placeholder="Seleccione un sector"
          className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
        />
      </div>
    </div>
  );
}
