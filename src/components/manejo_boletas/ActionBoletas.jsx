import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { convertDate_to_YMD } from "../../tools/convertDate";
import { getTimeHHMM } from "../../tools/getTimeHHMM";

export default function ActionBoletas({ selectedProducts, 
                                        estado,  
                                        detalle_boletas,
                                        setDetalle_Boletas }) {
  const navegate = useNavigate();

  const myURL_ = useSelector((state) => state.user.myURL);

  const toastControl = useRef(null);

  const handleClickCancelar = () => {
    navegate("/app");
  };

  const handleClickCrearBoleta = () => {
    navegate("/BoletaAsignacion ");
  };

  const pacthCerrarBoletas = async (values) => {
    if (values) {
      // Define the URL where you want to send the POST request
      const url = myURL_ + "/cerrar_boleta";
      // Make the POST request using Axios
      await axios
        .patch(url, values)
        .then(function (response) {
          // Handle success response
          //confirm1()
          let { resultado } = response.data;
          return resultado;
        })
        .catch(function (error) {
          // Handle error
          console.log(error);
          return false;
        });
    }
  };

  const handleClickCerrar = () => {
    if (selectedProducts) {
      let id = [];
      selectedProducts.forEach((element) => {
        id.push(element.id);
      });
      let valores = {
        id_boleta: id,
        fecha_final: convertDate_to_YMD(new Date()),
        hora_final: getTimeHHMM(),
      };

      let resultado = pacthCerrarBoletas(valores)
      if (resultado){

        let  detalle_boletas_copia = JSON.parse(JSON.stringify(detalle_boletas));

    
        id.forEach(element => {
          detalle_boletas_copia = detalle_boletas_copia.filter((row) => {return row.id !== element});
        })
        
        
        setDetalle_Boletas(detalle_boletas_copia)


      } else {
      toastControl.current.show({
        severity: "error",
        summary: "Miller CR",
        detail: "Debes seleccionar alguna boleta de asignacion",
        life: 3000,
      });
    }
    }
  };

  return (
    <div className="card">
      <div className="flex justify-content-center align-center mt-4 gap-5">
        <Button label="Cerrar Boletas" onClick={handleClickCerrar} disabled={estado} />
        <Button
          severity="success"
          label="Crear Boleta"
          onClick={handleClickCrearBoleta}
        />
        <Button label="Cancelar" onClick={handleClickCancelar} />
      </div>
      <Toast ref={toastControl} />
    </div>
  );
}
