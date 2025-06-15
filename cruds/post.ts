import { IMethods } from "../interfaces/IMethods";

export const postData = async({
  formData,
  endpointName,
  method = "POST",
  apiUrl
}: IMethods) => {
  try {
    const res = await fetch(`${apiUrl}/api/${endpointName}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      console.error(
        `Error al ${
          method === "POST" ? "agregar" : "actualizar"
        } ${endpointName}`
      );
      return {
        message: `No se pudo ${
          method === "POST" ? "agregar" : "actualizar"
        } ${endpointName}`,
      };
    }

    return await res.json();
  } catch (error) {
    console.error(`Error en ${method} ${endpointName}`, error);
    return { message: "Error de conexión" };
  }
};
