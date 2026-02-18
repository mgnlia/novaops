import { NextResponse } from "next/server";

export async function GET() {
  const services = [
    {
      name: "API Gateway",
      status: "healthy",
      uptime: 99.98,
      responseTime: 42,
      requestsPerMinute: 12400,
      lastCheck: new Date().toISOString(),
      endpoint: "https://api.novaops.io",
      version: "2.14.3",
    },
    {
      name: "PostgreSQL",
      status: "healthy",
      uptime: 99.99,
      responseTime: 8,
      requestsPerMinute: 8200,
      lastCheck: new Date().toISOString(),
      endpoint: "postgresql://db.novaops.internal:5432",
      version: "16.1",
    },
    {
      name: "Redis Cache",
      status: "degraded",
      uptime: 99.87,
      responseTime: 124,
      requestsPerMinute: 34100,
      lastCheck: new Date().toISOString(),
      endpoint: "redis://cache.novaops.internal:6379",
      version: "7.2.3",
      alert: "Cache hit ratio below 70% — eviction rate 3x normal",
    },
    {
      name: "Message Queue",
      status: "healthy",
      uptime: 99.95,
      responseTime: 15,
      requestsPerMinute: 5700,
      lastCheck: new Date().toISOString(),
      endpoint: "amqp://queue.novaops.internal:5672",
      version: "3.12.8",
    },
  ];

  return NextResponse.json({
    status: "operational",
    timestamp: new Date().toISOString(),
    services,
    summary: {
      total: 4,
      healthy: 3,
      degraded: 1,
      unhealthy: 0,
    },
  });
}
