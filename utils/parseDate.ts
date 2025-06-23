export const parseDate = (input?: string | number): string => {
  if (!input) return 'Fecha inválida';

  let timestamp: number;

  if (typeof input === 'number') {
    timestamp = input;
  } else if (typeof input === 'string') {
    const parsed = Date.parse(input);
    if (isNaN(parsed)) return 'Fecha inválida';
    timestamp = parsed;
  } else {
    return 'Fecha inválida';
  }

  const date = new Date(timestamp);

  return date.toLocaleString("es-AR", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

