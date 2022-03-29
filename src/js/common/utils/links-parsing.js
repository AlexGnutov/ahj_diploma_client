import { create } from './utils';

export function catchLinks(string) {
  const linkPattern = new RegExp(/https?:[//|\\][a-zA-Z0-9_/\-.%?=&]*[^.,;]/g);
  const links = string.match(linkPattern);
  let output = string;
  if (links) {
    links.forEach((link, index) => {
      output = output.replace(link, `$*<!>${index}$*`);
    });
  }
  return {
    string: output,
    links,
  };
}

export function combineText(textObject, linkClassName) {
  const outputElement = document.createElement('div');

  const parts = textObject.string.split('$*');
  parts.forEach((part) => {
    if (part.startsWith('<!>')) {
      const index = parseInt(part.replace('<!>', ''), 10);
      const linkText = textObject.links[index];
      const link = create('a', linkClassName);
      link.href = linkText;
      link.innerText = linkText;
      link.target = '_blank';
      outputElement.appendChild(link);
    } else {
      const text = document.createTextNode(part);
      outputElement.appendChild(text);
    }
  });
  return outputElement.innerHTML;
}

export function addLinks(elementWithText, linksClassName) {
  if (!elementWithText.textContent) {
    return elementWithText.innerHTML;
  }
  const string = elementWithText.textContent;
  if (string.length === 0) {
    return elementWithText.innerHTML;
  }
  const linksObject = catchLinks(string);
  return combineText(linksObject, linksClassName);
}
