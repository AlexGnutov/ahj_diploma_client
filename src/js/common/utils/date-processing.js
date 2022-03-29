export default function combineDateString(number) {
  const newDate = new Date(number);

  const pair = newDate.toLocaleString().split(', ');
  const time = pair[1].substring(0, 5);

  return `${pair[0]}, ${time}`;
}
