export function replaceAt(input: string, index: number, character: string) {
  if (index > input.length - 1) return input;
  return input.substring(0, index) + character + input.substring(index + 1);
}

interface rgb {
  r: number;
  g: number;
  b: number;
}

export function floatToRgbString(rgb: rgb) {
  const answer: rgb = {
    r: Math.round(rgb.r * 255),
    g: Math.round(rgb.g * 255),
    b: Math.round(rgb.b * 255),
  };

  return rgbToString(answer);
}

export function rgbToString(answer: rgb) {
  return `rgb(${answer.r},${answer.g},${answer.b})`;
}
