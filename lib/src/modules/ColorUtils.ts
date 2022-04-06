// Original: https://stackoverflow.com/a/54070620/592768
// License: https://creativecommons.org/licenses/by-sa/4.0/legalcode
function rgb2hsv(r: number, g: number, b: number): [number, number, number] {
  const v = Math.max(r, g, b);
  const c = v - Math.min(r, g, b);
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const h = c && (v === r ? (g - b) / c : v === g ? 2 + (b - r) / c : 4 + (r - g) / c);
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  return [60 * (h < 0 ? h + 6 : h), v && c / v, v];
}

// Original: https://stackoverflow.com/a/54024653/592768
// License: https://creativecommons.org/licenses/by-sa/4.0/legalcode
function hsv2rgb(h: number, s: number, v: number): [number, number, number] {
  const f = (n: number, k = (n + h / 60) % 6): number => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  return [f(5), f(3), f(1)];
}

// Original: https://stackoverflow.com/a/5624139/592768
// License: https://creativecommons.org/licenses/by-sa/4.0/legalcode
function hexToRgb(hex: string): [number, number, number] {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (_, r: string, g: string, b: string) {
    return `${r}${r}${g}${g}${b}${b}`;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result === null) {
    throw new Error(`Invalid color code: ${hex}`);
  }

  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

export function highlightColor(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, v] = rgb2hsv(r, g, b);
  const clipToFactor = (x: number): number => Math.min(1, Math.max(0, x));
  const [rNew, gNew, bNew] = hsv2rgb(h, clipToFactor(s + amount * -1), clipToFactor(v / 255 + amount) * 255).map(
    Math.round
  );
  return `rgb(${rNew}, ${gNew}, ${bNew})`;
}
