export function combineDateString(input) {
  const number = parseInt(`${input}`, 10);
  const newDate = new Date(number);
  const pair = newDate.toLocaleString().split(', ');
  const time = pair[1].substring(0, 5);
  return `${pair[0]}, ${time}`;
}

export function combineDateOnlyString(number) {
  const newDate = new Date(number);
  const pair = newDate.toLocaleString().split(', ');
  return `${pair[0]}`;
}
