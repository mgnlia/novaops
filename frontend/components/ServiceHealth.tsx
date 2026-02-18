"use client";

import { Activity, Database, HardDrive, Radio } from "lucide-react";

interface Service {
  name: string;
  status: "healthy" | "degraded" | "unhealthy";
  uptime: string;
  responseTime: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    name: "API Gateway",
    status: "healthy",
    uptime: "99.98%",
    responseTime: "42ms",
    icon: <Activity className="w-5 h-5" />,
  },
  {
    name: "PostgreSQL",
    status: "healthy",
    uptime: "99.95%",
    responseTime: "8ms",
    icon: <Database className="w-5 h-5" />,
  },
  {
    name: "Redis Cache",
    status: "degraded",
    uptime: "98.72%",
    responseTime: "156ms",
    icon: <HardDrive className="w-5 h-5" />,
  },
  {
    name: "Message Queue",
    status: "healthy",
    uptime: "99.99%",
    responseTime: "3ms",
    icon: <Radio className="w-5 h-5" />,
  },
];

const statusConfig = {
  healthy: {
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    dot: "bg-emerald-500",
    label: "Healthy",
  },
  degraded: {
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    dot: "bg-amber-500",
    label: "Degraded",
  },
  unhealthy: {
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    dot: "bg-red-500",
    label: "Unhealthy",
  },
};

export default function ServiceHealth() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Service Health
        </h2>
        <span className="text-xs text-slate-500">Last checked 12s ago</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {services.map((service) => {
          const cfg = statusConfig[service.status];
          return (
            <div
              key={service.name}
              className={`rounded-lg border ${cfg.border} ${cfg.bg} p-4 transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`${cfg.color}`}>{service.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-200 truncate">
                    {service.name}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-2 h-2 rounded-full ${cfg.dot} animate-pulse-slow`}
                  />
                  <span className={`text-xs font-medium ${cfg.color}`}>
                    {cfg.label}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>
                  Uptime: <span className="text-slate-200">{service.uptime}</span>
                </span>
                <span>
                  Latency:{" "}
                  <span className="text-slate-200">{service.responseTime}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
