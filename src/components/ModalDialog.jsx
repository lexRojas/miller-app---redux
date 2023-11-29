// import React, { useEffect } from "react";
// import { Modal, Button } from "react-bootstrap";
// import miller from "../assets/miller_color.png";


// function ModalDialog(props) {
//   const [isShow, invokeModal] = React.useState(false)

//   useEffect(() => {
//     if (props.isOpen === true) {
//       invokeModal(true);
//     } else {
//       invokeModal(false);
//     }
//   }, [props]);

//   return (
//     <>
//       <Modal show={isShow}>
//         <Modal.Header closeButton onClick={props.closeModal}>
//           <Modal.Title>   
//               <img className="m-2 d-inline justify-content-center"  src={miller} alt="M" width={35} height={35} />
//               {props.titulo}
//             </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>{props.mensaje}</Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={props.closeModal}>
//             Cerrar
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }
// export default ModalDialog;
