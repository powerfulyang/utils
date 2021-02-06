export function randomHslColor(min: number, max: number) {
  return `hsl(${(Math.random() * 360).toFixed()},${(Math.random() * 30 + 70).toFixed()}%,${(
    Math.random() * (max - min) +
    min
  ).toFixed()}%)`;
}

export function randomDarkColor() {
  return randomHslColor(10, 50);
}

export function randomLightColor() {
  return randomHslColor(50, 90);
}
