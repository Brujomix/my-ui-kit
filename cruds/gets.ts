import { IMethods } from "../interfaces/IMethods";

export const getData = async ({ apiUrl, endpointName }: IMethods) => {
  try {
    const res = await fetch(`${apiUrl}/api/${endpointName}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      console.error(`Error al obtener ${endpointName}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`Error en get${endpointName}`, error);
    return null;
  }
};
