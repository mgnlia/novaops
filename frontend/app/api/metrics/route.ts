import { NextResponse } from "next/server";

export async function GET() {
  const latency = Array.from({ length: 24 }, (_, i) => {
    const base = 45 + Math.sin(i / 3) * 15;
    const spike = i === 14 ? 180 : i === 15 ? 120 : 0;
    return {
      time: `${String(i).padStart(2, "0")}:00`,
      p50: Math.round(base + Math.random() * 10),
      p95: Math.round(base * 1.8 + Math.random() * 20 + spike * 0.6),
      p99: Math.round(base * 2.5 + Math.random() * 30 + spike),
    };
  });

  const throughput = Array.from({ length: 24 }, (_, i) => {
    const base = 1200 + Math.sin((i - 6) / 4) * 800;
    return {
      time: `${String(i).padStart(2, "0")}:00`,
      requests: Math.round(Math.max(200, base + Math.random() * 200)),
      errors: Math.round(Math.max(0, (i === 14 ? 45 : 2) + Math.random() * 3)),
    };
  });

  return NextResponse.json({ latency, throughput });
}
