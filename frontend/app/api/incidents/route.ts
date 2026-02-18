import { NextResponse } from "next/server";

export async function GET() {
  const incidents = [
    {
      id: "INC-2847",
      title: "Redis cache hit ratio dropped below 70%",
      severity: "high",
      status: "investigating",
      createdAt: "2025-01-15T14:23:00Z",
      updatedAt: "2025-01-15T14:30:00Z",
      assignedAgent: "Monitor Agent",
      description:
        "Cache eviction rate spiked 3x. Analyst Agent correlating with deployment timeline.",
      affectedServices: ["Redis Cache", "API Gateway"],
      timeline: [
        {
          time: "14:23:00",
          event: "Alert triggered: cache hit ratio < 70%",
          agent: "Monitor",
        },
        {
          time: "14:24:12",
          event: "Commander dispatched investigation to Analyst",
          agent: "Commander",
        },
        {
          time: "14:28:45",
          event: "Correlation found with deploy v2.14.2 memory settings",
          agent: "Analyst",
        },
      ],
    },
    {
      id: "INC-2846",
      title: "API latency spike on /v2/inference endpoint",
      severity: "critical",
      status: "active",
      createdAt: "2025-01-15T14:18:00Z",
      updatedAt: "2025-01-15T14:35:00Z",
      assignedAgent: "Commander Agent",
      description:
        "P99 latency exceeded 2s threshold. Auto-scaling triggered by Commander.",
      affectedServices: ["API Gateway"],
      timeline: [
        {
          time: "14:18:00",
          event: "P99 latency breach detected",
          agent: "Monitor",
        },
        {
          time: "14:18:30",
          event: "Auto-scale policy triggered: 3 → 5 replicas",
          agent: "Commander",
        },
        {
          time: "14:22:00",
          event: "New replicas healthy, latency stabilizing",
          agent: "Monitor",
        },
      ],
    },
    {
      id: "INC-2845",
      title: "Certificate renewal warning — expires in 14 days",
      severity: "medium",
      status: "mitigated",
      createdAt: "2025-01-15T13:45:00Z",
      updatedAt: "2025-01-15T14:00:00Z",
      assignedAgent: "Monitor Agent",
      description:
        "TLS certificate for api.novaops.io flagged. Auto-renewal scheduled.",
      affectedServices: ["API Gateway"],
      timeline: [
        {
          time: "13:45:00",
          event: "Certificate expiry warning triggered",
          agent: "Monitor",
        },
        {
          time: "13:46:00",
          event: "Auto-renewal request submitted to Let's Encrypt",
          agent: "Commander",
        },
      ],
    },
    {
      id: "INC-2844",
      title: "Database connection pool near capacity (85%)",
      severity: "high",
      status: "investigating",
      createdAt: "2025-01-15T13:30:00Z",
      updatedAt: "2025-01-15T14:10:00Z",
      assignedAgent: "Analyst Agent",
      description:
        "Connection pool utilization trending upward. Query optimization recommended.",
      affectedServices: ["PostgreSQL"],
      timeline: [
        {
          time: "13:30:00",
          event: "Pool utilization exceeded 80% threshold",
          agent: "Monitor",
        },
        {
          time: "13:32:00",
          event: "Slow query analysis initiated",
          agent: "Analyst",
        },
      ],
    },
    {
      id: "INC-2843",
      title: "Deployment v2.14.3 rolled out successfully",
      severity: "info",
      status: "resolved",
      createdAt: "2025-01-15T12:00:00Z",
      updatedAt: "2025-01-15T12:15:00Z",
      assignedAgent: "Commander Agent",
      description:
        "Zero-downtime deployment completed. All health checks passing.",
      affectedServices: [],
      timeline: [
        {
          time: "12:00:00",
          event: "Deployment initiated",
          agent: "Commander",
        },
        {
          time: "12:12:00",
          event: "All pods rolled over, health checks green",
          agent: "Monitor",
        },
        {
          time: "12:15:00",
          event: "Deployment confirmed successful",
          agent: "Commander",
        },
      ],
    },
  ];

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    total: incidents.length,
    active: incidents.filter(
      (i) => i.status === "active" || i.status === "investigating"
    ).length,
    incidents,
  });
}
