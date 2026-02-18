"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Flame,
  Clock,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

interface Incident {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  status: "active" | "investigating" | "mitigated" | "resolved";
  timestamp: string;
  timeAgo: string;
  assignedAgent: string;
  description: string;
}

const incidents: Incident[] = [
  {
    id: "INC-2847",
    title: "Redis cache hit ratio dropped below 70%",
    severity: "high",
    status: "investigating",
    timestamp: "2025-01-15T14:23:00Z",
    timeAgo: "12m ago",
    assignedAgent: "Monitor Agent",
    description: "Cache eviction rate spiked 3x. Analyst Agent correlating with deployment timeline.",
  },
  {
    id: "INC-2846",
    title: "API latency spike on /v2/inference endpoint",
    severity: "critical",
    status: "active",
    timestamp: "2025-01-15T14:18:00Z",
    timeAgo: "17m ago",
    assignedAgent: "Commander Agent",
    description: "P99 latency exceeded 2s threshold. Auto-scaling triggered by Commander.",
  },
  {
    id: "INC-2845",
    title: "Certificate renewal warning — expires in 14 days",
    severity: "medium",
    status: "mitigated",
    timestamp: "2025-01-15T13:45:00Z",
    timeAgo: "50m ago",
    assignedAgent: "Monitor Agent",
    description: "TLS certificate for api.novaops.io flagged. Auto-renewal scheduled.",
  },
  {
    id: "INC-2844",
    title: "Database connection pool near capacity (85%)",
    severity: "high",
    status: "investigating",
    timestamp: "2025-01-15T13:30:00Z",
    timeAgo: "1h 5m ago",
    assignedAgent: "Analyst Agent",
    description: "Connection pool utilization trending upward. Query optimization recommended.",
  },
  {
    id: "INC-2843",
    title: "Deployment v2.14.3 rolled out successfully",
    severity: "info",
    status: "resolved",
    timestamp: "2025-01-15T12:00:00Z",
    timeAgo: "2h 35m ago",
    assignedAgent: "Commander Agent",
    description: "Zero-downtime deployment completed. All health checks passing.",
  },
];

const severityConfig = {
  critical: {
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/30",
    icon: <Flame className="w-3.5 h-3.5" />,
    label: "CRITICAL",
    badge: "bg-red-500/20 text-red-400 border-red-500/30",
  },
  high: {
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/30",
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
    label: "HIGH",
    badge: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  },
  medium: {
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
    icon: <AlertCircle className="w-3.5 h-3.5" />,
    label: "MEDIUM",
    badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  low: {
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/30",
    icon: <Info className="w-3.5 h-3.5" />,
    label: "LOW",
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  info: {
    color: "text-slate-400",
    bg: "bg-slate-400/10",
    border: "border-slate-400/30",
    icon: <Info className="w-3.5 h-3.5" />,
    label: "INFO",
    badge: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  },
};

const statusConfig = {
  active: { color: "text-red-400", bg: "bg-red-400/10", dot: "bg-red-400" },
  investigating: {
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    dot: "bg-amber-400",
  },
  mitigated: {
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    dot: "bg-blue-400",
  },
  resolved: {
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    dot: "bg-emerald-400",
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export default function IncidentFeed() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          Active Incidents
        </h2>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs text-red-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            2 active
          </span>
        </div>
      </div>
      <motion.div
        className="space-y-2.5"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {incidents.map((incident) => {
          const sev = severityConfig[incident.severity];
          const stat = statusConfig[incident.status];
          return (
            <motion.div
              key={incident.id}
              variants={item}
              className={`group relative rounded-lg border border-slate-800 bg-slate-900/50 p-3.5 hover:bg-slate-800/50 hover:border-slate-700 transition-all duration-200 cursor-pointer`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div
                    className={`mt-0.5 p-1.5 rounded-md ${sev.bg} ${sev.color} shrink-0`}
                  >
                    {sev.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-mono text-slate-500">
                        {incident.id}
                      </span>
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wider border ${sev.badge}`}
                      >
                        {sev.label}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${stat.bg} ${stat.color}`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full ${stat.dot} ${
                            incident.status === "active" ? "animate-pulse" : ""
                          }`}
                        />
                        {incident.status.charAt(0).toUpperCase() +
                          incident.status.slice(1)}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-slate-200 mb-1 truncate">
                      {incident.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {incident.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock className="w-3 h-3" />
                    {incident.timeAgo}
                  </span>
                  <span className="text-[10px] text-slate-600">
                    → {incident.assignedAgent}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
