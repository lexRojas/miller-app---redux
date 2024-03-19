import { Toast } from "primereact/toast"
import {useState,useRef,useEffect} from "react"

export default function Mensaje(props) {
    

    const {titulo, mensaje, tipo, tiempo, visible} = props;

    const toastRef = useRef(null)
    const [ver, setVisible] = useState(false)


    useEffect(() => {

        toastRef.current.show({
            severity: tipo,
            summary:titulo,
            detail: mensaje,
            life:tiempo
        })

      setVisible(visible)
   
      
    }, [mensaje, props, tiempo, tipo, titulo, visible])
    


    
    return (

        <>
        {ver && <Toast ref={toastRef}/>}
        </>
    )
}