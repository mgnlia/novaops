import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    agents: [
      { name: "Commander", role: "Orchestrator", status: "active", model: "amazon.nova-pro-v1:0", taskCount: 142, lastAction: "Delegated INC-2846 to Analyst" },
      { name: "Monitor", role: "Health Checks", status: "active", model: "amazon.nova-pro-v1:0", taskCount: 1283, lastAction: "Health scan completed (4 services)" },
      { name: "Analyst", role: "Root Cause Analysis", status: "processing", model: "amazon.nova-pro-v1:0", taskCount: 67, lastAction: "Analyzing INC-2847 cache eviction" },
      { name: "Voice", role: "Alerts & Notifications", status: "idle", model: "amazon.nova-pro-v1:0", taskCount: 34, lastAction: "Sent critical alert for INC-2846" },
      { name: "Dashboard", role: "Incident Management", status: "active", model: "amazon.nova-pro-v1:0", taskCount: 89, lastAction: "Updated incident feed" },
    ],
    activeCount: 3,
    totalCount: 5,
  });
}
