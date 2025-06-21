import { TMethods } from "../types";

type props = {
    loading : boolean,
    methods : TMethods
}

export const methodsToText = ({loading, methods}:props) => {
  
  if (!loading) return "Confirmar";

  switch (methods) {
    case "POST":
      return "Agregando";
    case "PUT":
      return "Editando";
    default:
      return "Eliminando";
  }
};