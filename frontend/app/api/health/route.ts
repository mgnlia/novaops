import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "operational",
    timestamp: new Date().toISOString(),
    services: [
      { name: "API Gateway", status: "healthy", uptime: 99.98, responseTimeMs: 42 },
      { name: "PostgreSQL", status: "healthy", uptime: 99.95, responseTimeMs: 8 },
      { name: "Redis Cache", status: "degraded", uptime: 98.72, responseTimeMs: 156 },
      { name: "Message Queue", status: "healthy", uptime: 99.99, responseTimeMs: 3 },
    ],
  });
}
