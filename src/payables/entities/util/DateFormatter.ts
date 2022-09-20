export function dateFormatter(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

export function getTodayDate(): string {
  const today = new Date();
  return dateFormatter(today);
}
