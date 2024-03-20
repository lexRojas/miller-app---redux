import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import {useRef} from 'react'


export default function ActionBoletas({selectedProducts}) {

  const navegate = useNavigate()
  const toastControl = useRef(null);

  const handleClickCancelar = () =>{
    navegate('/app')
  }

  const handleClickCerrar = () => {
    console.log(selectedProducts)
    if (selectedProducts) {
    } else {
      toastControl.current.show({
        severity: "error",
        summary: "Miller CR",
        detail: "Debes seleccionar alguna boleta de asignacion",
        life: 3000,
      });
    }
  };


  return (
    <div className="card">
     <div className="flex justify-content-center align-center mt-4 gap-5">
        <Button label="Cerrar Boletas" onClick={handleClickCerrar} />
        <Button label="Cancelar" onClick={handleClickCancelar} />
      </div>
      <Toast ref={toastControl} />
    </div>
  );
}
