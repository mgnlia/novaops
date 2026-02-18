import { NextResponse } from "next/server";

function generateTimeSeries() {
  const now = new Date();
  const points = [];

  for (let i = 24; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = time.getHours();

    // Simulate realistic traffic patterns
    const baseLoad = Math.sin((hour / 24) * Math.PI * 2 - Math.PI / 2) * 0.4 + 0.6;
    const noise = () => (Math.random() - 0.5) * 0.1;

    const rps = Math.round(baseLoad * 12000 + noise() * 2000);
    const p50 = Math.round(25 + baseLoad * 40 + noise() * 10);
    const p95 = Math.round(p50 * 2.2 + noise() * 30);
    const p99 = Math.round(p95 * 1.8 + noise() * 50);
    const errorRate = Math.max(0, +(baseLoad * 0.5 + noise() * 0.2).toFixed(2));
    const cpuUsage = Math.round(baseLoad * 65 + noise() * 10);
    const memoryUsage = Math.round(55 + baseLoad * 20 + noise() * 5);

    points.push({
      timestamp: time.toISOString(),
      time: time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      latency: { p50, p95, p99 },
      throughput: { rps, errors: Math.round(rps * errorRate * 0.01) },
      resources: { cpuUsage, memoryUsage },
      errorRate,
    });
  }

  return points;
}

export async function GET() {
  const timeSeries = generateTimeSeries();

  const latest = timeSeries[timeSeries.length - 1];

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    interval: "1h",
    duration: "24h",
    summary: {
      avgLatencyP50: Math.round(
        timeSeries.reduce((sum, p) => sum + p.latency.p50, 0) / timeSeries.length
      ),
      avgLatencyP95: Math.round(
        timeSeries.reduce((sum, p) => sum + p.latency.p95, 0) / timeSeries.length
      ),
      avgLatencyP99: Math.round(
        timeSeries.reduce((sum, p) => sum + p.latency.p99, 0) / timeSeries.length
      ),
      peakRps: Math.max(...timeSeries.map((p) => p.throughput.rps)),
      avgErrorRate: +(
        timeSeries.reduce((sum, p) => sum + p.errorRate, 0) / timeSeries.length
      ).toFixed(2),
      availability: 99.98,
    },
    current: latest,
    timeSeries,
  });
}
