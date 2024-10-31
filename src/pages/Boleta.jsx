import React from "react";
import '../css/boleta.css'

const Boleta = (props) => {
  //const { boleta } = props;

  const user = {
    id_proyecto: '22',
    desc_proyecto: 'CONSTRUCCION DEL EDIFICIO DEL BNCR EN PALMARES DE ALAJUELA',
    usuario: "string",
    myURL: "string",
    id_sector: "string",
    actividad: []
}

  const boleta = {
    fecha_inicio: "2024-10-31",
    proyecto: "2023317",
    ubicacion: "gbgtbn",
    comentarios: "CONFECCION DE HELADOS         ",
    cantidad_medida: 874,
    unidad_medida: "KGS                           ",
    hora_inicio: "14:14",
    hora_final: "17:00",
    cerrada: false,
    codigo_manobra: 1103,
    fecha_final: "2024-10-31",
    empleados_asignados: [
      {
        codigo_empleado: "317591",
        nombre_completo: "ABEDNIGO . LOPEZ HANSIN",
        nombre_codigo: "317591-ABEDNIGO . LOPEZ HANSIN",
      },
    ],
  };

  const enviar = () => {
 
  }



  return (<div>
        <div >
            <h3>PROYECTO: {boleta.proyecto} - {user.desc_proyecto} </h3>
            <span>Detalle de Boleta de Asignacion</span>
        </div>
        <hr />
        <div className="cuerpo_boleta">

            <div className="item-texto">
               <p className="label">Actividad</p>
               <p>{boleta.comentarios} </p>
            </div>
            <div className="item-texto">

               <p className="label">Fecha Inicio</p>
               <p>{boleta.fecha_inicio}</p>
            </div>
            



        </div>
        <hr />
        <div className="cuerpo_boleta">
            <button onClick={enviar}> Enviar </button>
        </div>        

    
    
    
    
    
    
    </div>);
};

export default Boleta;
