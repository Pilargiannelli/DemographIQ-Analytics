export function fitExponential(data) {
  const x = data.map(d => d.anio);
  const y = data.map(d => d.poblacion);

  const lnY = y.map(v => Math.log(v));

  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = lnY.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((acc, v, i) => acc + v * lnY[i], 0);
  const sumX2 = x.reduce((acc, v) => acc + v * v, 0);

  const b = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const lnA = (sumY - b * sumX) / n;
  const a = Math.exp(lnA);

  return { a, b };
}

export function predict(a, b, year) {
  return a * Math.exp(b * year);
}
