import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    incidents: [
      { id: "INC-2847", title: "Redis cache eviction rate exceeded threshold", severity: "high", status: "investigating", timestamp: "2025-02-18T14:21:00Z", assignedAgent: "Analyst" },
      { id: "INC-2846", title: "API latency spike on /v2/inference endpoint", severity: "critical", status: "active", timestamp: "2025-02-18T14:15:00Z", assignedAgent: "Commander" },
      { id: "INC-2845", title: "Disk usage at 87% on worker-node-03", severity: "medium", status: "investigating", timestamp: "2025-02-18T14:00:00Z", assignedAgent: "Monitor" },
      { id: "INC-2844", title: "TLS certificate renewal warning (7 days)", severity: "low", status: "mitigated", timestamp: "2025-02-18T13:22:00Z", assignedAgent: "Dashboard" },
      { id: "INC-2843", title: "Memory leak detected in inference-service pod", severity: "high", status: "resolved", timestamp: "2025-02-18T11:05:00Z", assignedAgent: "Analyst" },
    ],
    total: 5,
    open: 4,
  });
}
