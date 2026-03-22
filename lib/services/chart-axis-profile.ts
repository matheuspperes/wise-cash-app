type DynamicChartAxisProfile = {
  axisMax: number;
  tickCount: number;
  ticks: number[];
};

function getNiceStep(value: number): number {
  if (value <= 0) {
    return 1;
  }

  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  const normalized = value / magnitude;

  if (normalized <= 1) return 1 * magnitude;
  if (normalized <= 2) return 2 * magnitude;
  if (normalized <= 2.5) return 2.5 * magnitude;
  if (normalized <= 5) return 5 * magnitude;
  return 10 * magnitude;
}

export function buildDynamicChartAxisProfile(values: number[]): DynamicChartAxisProfile {
  const seriesMax = values.reduce((maxValue, value) => Math.max(maxValue, Number(value) || 0), 0);

  if (seriesMax <= 0) {
    return {
      axisMax: 100,
      tickCount: 5,
      ticks: [0, 25, 50, 75, 100],
    };
  }

  const paddedMax = seriesMax * 1.1;
  const targetTickCount = paddedMax < 2000 ? 5 : paddedMax < 15000 ? 6 : 5;
  const roughStep = paddedMax / (targetTickCount - 1);
  const step = getNiceStep(roughStep);
  const axisMax = step * (targetTickCount - 1);

  const ticks = Array.from({ length: targetTickCount }, (_, index) => Math.round(step * index));

  return {
    axisMax,
    tickCount: ticks.length,
    ticks,
  };
}

export function formatAxisTickLabel(value: number): string {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return "0";
  }

  if (Math.abs(numeric) >= 1000) {
    const compact = numeric / 1000;
    const withDecimal = Math.abs(compact) < 10 && Math.abs(numeric % 1000) > 0;
    const formatted = compact.toFixed(withDecimal ? 1 : 0).replace(".", ",");
    return `${formatted}k`;
  }

  return String(Math.round(numeric));
}
