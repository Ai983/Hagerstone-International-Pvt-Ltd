export const isFreedomWeek = (d = new Date()) => {
  const y = 2025; // keep simple for now
  const start = new Date(`${y}-08-11T00:00:00`);
  const end   = new Date(`${y}-08-18T23:59:59`);
  return d >= start && d <= end;
};
