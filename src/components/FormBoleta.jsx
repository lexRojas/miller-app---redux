import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Calendar} from "primereact/calendar"

import { actividad } from "../context/userSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";





function FormBoleta() {

//  const {elemento} = useContext(Context)

  
  const [ubicación, setUbicacionPlanos] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [medida, setMedida] = useState(0);
  const [um, setUM] = useState("");
  const [hora_inicio, setHora_Inicio] = useState("")
  const [hora_final, setHora_Final] = useState("17:00")

  const actividad_ = useSelector(actividad)

  useEffect(() => {

    setDescripcion(actividad_.actividad)
    setUM(actividad_.unidad_medida)
    setMedida(actividad_.cantidad)
    
  }, [actividad_])


  return (
    <div className="card col" id="formulario_boleta">
      <div className="flex flex-column gap-1 pb-2">
        <label htmlFor="planos">Ubicación en Planos</label>
        <InputText
          id="panos"
          aria-describedby="planos-help"
          value={ubicación}
          onChange={(e) => setUbicacionPlanos(e.target.value)}
        />
        <small id="planos-help">
          Indique la sección del plano donde se realizará la actividad.
        </small>
      </div>

      <div className="flex flex-column gap-1 pb-2">
        <label htmlFor="planos">Comentarios</label>
        <InputTextarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows={5}
        />
      </div>
      <div className="flex flex-row pb-2 gap-3">
        <div className="flex flex-column gap-2 p-0 col-6">
          <label htmlFor="planos">Cantidad de medida</label>
          <InputNumber
            value={medida}
            onChange={(e) => setMedida(e.value)}
            minFractionDigits={2}
            maxFractionDigits={5}
          />
        </div>
        <div className="flex flex-column gap-2 p-0 col-6">
          <label htmlFor="planos">Unidad de Medida</label>
          <InputText
            id="panos"
            aria-describedby="planos-help"
            value={um}
            onChange={(e) => setUM(e.value)}
            disabled
          />
        </div>
      </div>
      <div className="flex flex-row pb-2 gap-3">
        <div className="flex flex-column gap-2 p-0 col-6">
          <label htmlFor="planos">Hora Inicio:</label>
          <Calendar 
            id="hora_inicio" 
            value={hora_inicio} 
            onChange={(e) => setHora_Inicio(e.target.value)} 
            timeOnly
            aria-describedby="hora_help"/>
          <small>Formato HH:MM </small>
        </div>
        <div className="flex flex-column gap-2 p-0 col-6">
          <label htmlFor="planos">Hora Final</label>
          <Calendar 
            id="hora_final" 
            value={hora_final} 
            onChange={(e) => setHora_Final(e.target.value)} 
            timeOnly
            disabled
            aria-describedby="hora_help"/>
          <small>Formato HH:MM </small>
          
        </div>
      </div>
    </div>
  );
}

export default FormBoleta;
