export default function shortLink(linkText) {
  if (linkText.length > 15) {
    return `${linkText.substring(0, 20)}...`;
  }
  return linkText;
}
