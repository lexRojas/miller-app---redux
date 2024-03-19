import miller from "../assets/miller.png";

import React, { useRef } from "react";
import { Button } from "primereact/button";
import { TieredMenu } from "primereact/tieredmenu";
import { useNavigate } from "react-router-dom";

import {useEffect} from 'react'
import { obtenerDatos } from "../db/dbController";

import { SET_ID_PROYECTO} from '../context/userSlice'

import { useDispatch, useSelector } from 'react-redux';




export default function MainMenu() {
  const menu = useRef(null);
  const navegate = useNavigate();

  const descripcion = useSelector(state => state.user.desc_proyecto)
  const id  = useSelector(state => state.user.id_proyecto)


  const dispacth = useDispatch()
 

  useEffect(() => {
    


    const obtenerInfo = async () => {
  
      try {
        const id_proyecto = await obtenerDatos(1);
        const desc_proyecto = await obtenerDatos(2);
      
        dispacth(SET_ID_PROYECTO({id:id_proyecto, descripcion:desc_proyecto}))
          
      } catch (error) {
        
      }
      
  
  
  
    }
     
    obtenerInfo();  
 
  }, [dispacth])

  const items = [
    {
      label: "Proyectos",
      icon: "pi pi-fw pi-pencil",
      command: () => {
        navegate("/proyectos");
      },
    },
    {
      label: "Procesos",
      icon: "pi pi-fw pi-pencil",
      items: [
        {
          label: "Crear Boleta Asignación",
          icon: "pi pi-fw pi-align-left",
          command: () => {
            navegate("/BoletaAsignacion");
          },
        },
        {
          label: "Ver boletas asignadas",
          icon: "pi pi-fw pi-align-left",
          command: () => {
            navegate("/DetalleBoletas");
          },
        }      ],
    },
    {
      label: "Reportes",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "Reporte 1",
          icon: "pi pi-fw pi-user-plus",
          command: () => {
            navegate("/");
          },
        },
        {
          label: "Reporte 2",
          icon: "pi pi-fw pi-user-minus",
          command: () => {
            navegate("/");
          },
        },
      ],
    },
    {
      label: "Catálogos",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "Cat  1",
          icon: "pi pi-fw pi-user-plus",
          command: () => {
            navegate("/");
          },
        },
        {
          label: "Cat  2",
          icon: "pi pi-fw pi-user-minus",
          command: () => {
            navegate("/");
          },
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: "Seguridad",
      icon: "pi pi-fw pi-user",
      command: () => {
        navegate("/");
      },
    },

    {
      separator: true,
    },

    {
      label: "Salir",
      icon: "pi pi-fw pi-power-off",
      command: () => {
        navegate("/");
      },
    },
  ];

  return (
    <div className="flex menu-barra">
      
      <div className="col-fixed menu-botton">
        <TieredMenu model={items} popup ref={menu} breakpoint="767px" />
        <Button
          label="Menú"
          icon="pi pi-bars"
          onClick={(e) => menu.current.toggle(e)}
        />
      </div>
      <div className="flex flex-grow-1 justify-content-evenly  align-items-center flex-wrap">
        <div className="flex m-0">
          <img className="" src={miller} alt="M" width={35} height={35} />
          <label className="menu-titulo px-2"> Miller Constructora 2023</label>
        </div>
        {id !== ""?( <>
          <p className="menu-subtitulo"> {descripcion} </p>
          <p className="menu-subtitulo"> {id} </p>
          </>
        ):( 
          <p className="menu-error"> No existe proyecto ! </p>
        )} 
      </div>
    </div>
  );
}
