"use client";

import { AlertTriangle, AlertCircle, Info, CheckCircle2 } from "lucide-react";

interface Incident {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "active" | "investigating" | "mitigated" | "resolved";
  timestamp: string;
  assignedAgent: string;
}

const incidents: Incident[] = [
  {
    id: "INC-2847",
    title: "Redis cache eviction rate exceeded threshold",
    severity: "high",
    status: "investigating",
    timestamp: "2 min ago",
    assignedAgent: "Analyst",
  },
  {
    id: "INC-2846",
    title: "API latency spike on /v2/inference endpoint",
    severity: "critical",
    status: "active",
    timestamp: "8 min ago",
    assignedAgent: "Commander",
  },
  {
    id: "INC-2845",
    title: "Disk usage at 87% on worker-node-03",
    severity: "medium",
    status: "investigating",
    timestamp: "23 min ago",
    assignedAgent: "Monitor",
  },
  {
    id: "INC-2844",
    title: "TLS certificate renewal warning (7 days)",
    severity: "low",
    status: "mitigated",
    timestamp: "1 hr ago",
    assignedAgent: "Dashboard",
  },
  {
    id: "INC-2843",
    title: "Memory leak detected in inference-service pod",
    severity: "high",
    status: "resolved",
    timestamp: "3 hrs ago",
    assignedAgent: "Analyst",
  },
];

const severityConfig = {
  critical: {
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "text-red-400",
    bg: "bg-red-500/10",
    badge: "bg-red-500/20 text-red-400 border-red-500/30",
  },
  high: {
    icon: <AlertCircle className="w-4 h-4" />,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    badge: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  },
  medium: {
    icon: <Info className="w-4 h-4" />,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  low: {
    icon: <CheckCircle2 className="w-4 h-4" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
};

const statusColors: Record<string, string> = {
  active: "text-red-400",
  investigating: "text-amber-400",
  mitigated: "text-blue-400",
  resolved: "text-emerald-400",
};

export default function IncidentFeed() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Active Incidents
        </h2>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
          {incidents.filter((i) => i.status !== "resolved").length} open
        </span>
      </div>
      <div className="space-y-2">
        {incidents.map((incident) => {
          const sev = severityConfig[incident.severity];
          return (
            <div
              key={incident.id}
              className={`rounded-lg border border-slate-800 bg-slate-900/50 p-3 hover:bg-slate-800/50 transition-colors`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 ${sev.color}`}>{sev.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-slate-500">
                      {incident.id}
                    </span>
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${sev.badge}`}
                    >
                      {incident.severity}
                    </span>
                  </div>
                  <p className="text-sm text-slate-200 leading-tight">
                    {incident.title}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <span className={statusColors[incident.status]}>
                      ● {incident.status}
                    </span>
                    <span className="text-slate-500">{incident.timestamp}</span>
                    <span className="text-slate-500">
                      → {incident.assignedAgent}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
