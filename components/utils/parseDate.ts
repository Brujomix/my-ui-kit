export const parseDate = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleString("es-AR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
