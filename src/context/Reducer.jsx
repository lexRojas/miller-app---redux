/* eslint-disable import/no-anonymous-default-export */
import {
  SET_BASEURL,
  SET_ID_PROYECTO,
  SET_ID_SECTORES,
  SET_ID_USUARIO,
  SET_ACTIVIDAD,
} from "./types";

export default (state, action) => {
  const { payload, type } = action;
  switch (type) {

    case SET_ID_PROYECTO:
      return {
        ...state,
        id_proyecto: payload.id,
        desc_proyecto: payload.descripcion,
      };
    case SET_ID_USUARIO:
      return {
        ...state,
        usuario: payload,
      };
    case SET_BASEURL:
      return {
        ...state,
        baseURL: payload,
      };
    case SET_ID_SECTORES:
      return {
        ...state,
        id_sector: payload,
      };
      case SET_ACTIVIDAD:
        return {
          ...state,
          elemento: payload,
        };
      default:
      return { state };
  }
};
