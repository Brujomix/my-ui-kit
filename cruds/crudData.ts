import { ICrud } from "../interfaces/ICrud";

export const crudData = async <T> ({
  apiUrl,
  endpointName,
  data,
  method,
}: ICrud<T>) => {
  switch (method) {
    case "GET":
      try {
        const res = await fetch(`${apiUrl}/api/${endpointName}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) {
          console.error(`Error al ${method} ${endpointName}`);
          return null;
        }

        return await res.json();
      } catch (error) {
        console.error(`Error en get${endpointName}`, error);
        return null;
      }

    case "POST":
      try {
        const res = await fetch(`${apiUrl}/api/${endpointName}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({data: data}),
        });

        if (!res.ok) {
          console.error(`Error al ${method} ${endpointName}`);
        }

        return await res.json();
      } catch (error) {
        console.error(`Error en ${method} ${endpointName}`, error);
        return { message: "Error de conexión" };
      }

    case "PUT":
      try {
        const res = await fetch(`${apiUrl}/api/${endpointName}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: data }),
        });

        if (!res.ok) {
          console.error(`Error al ${method} ${endpointName}`);
        }

        return await res.json();
      } catch (error) {
        console.error(`Error en ${method} ${endpointName}`, error);
        return { message: "Error de conexión" };
      }

    case "DELETE":
      try {
        const res = await fetch(`${apiUrl}/api/${endpointName}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: data }),
        });

        if (!res.ok) {
          console.error(`Error al ${method} ${endpointName}`);
        }

        return await res.json();
      } catch (error) {
        console.error(`Error en ${method} ${endpointName}`, error);
        return { message: "Error de conexión" };
      }
  }
};
