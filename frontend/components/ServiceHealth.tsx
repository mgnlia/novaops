"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Database,
  HardDrive,
  Radio,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

interface Service {
  name: string;
  status: "healthy" | "degraded" | "unhealthy";
  uptime: string;
  responseTime: string;
  requests: string;
  icon: React.ReactNode;
  lastCheck: string;
}

const services: Service[] = [
  {
    name: "API Gateway",
    status: "healthy",
    uptime: "99.98%",
    responseTime: "42ms",
    requests: "12.4K/min",
    icon: <Activity className="w-5 h-5" />,
    lastCheck: "2s ago",
  },
  {
    name: "PostgreSQL",
    status: "healthy",
    uptime: "99.99%",
    responseTime: "8ms",
    requests: "8.2K/min",
    icon: <Database className="w-5 h-5" />,
    lastCheck: "5s ago",
  },
  {
    name: "Redis Cache",
    status: "degraded",
    uptime: "99.87%",
    responseTime: "124ms",
    requests: "34.1K/min",
    icon: <HardDrive className="w-5 h-5" />,
    lastCheck: "3s ago",
  },
  {
    name: "Message Queue",
    status: "healthy",
    uptime: "99.95%",
    responseTime: "15ms",
    requests: "5.7K/min",
    icon: <Radio className="w-5 h-5" />,
    lastCheck: "1s ago",
  },
];

const statusConfig = {
  healthy: {
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    glow: "glow-green",
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
    label: "Healthy",
    dot: "bg-emerald-400",
  },
  degraded: {
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    glow: "glow-amber",
    icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
    label: "Degraded",
    dot: "bg-amber-400",
  },
  unhealthy: {
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
    glow: "glow-red",
    icon: <XCircle className="w-4 h-4 text-red-400" />,
    label: "Unhealthy",
    dot: "bg-red-400",
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ServiceHealth() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          Service Health
        </h2>
        <span className="text-xs text-slate-500 font-mono">
          Auto-refresh: 10s
        </span>
      </div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {services.map((service) => {
          const cfg = statusConfig[service.status];
          return (
            <motion.div
              key={service.name}
              variants={item}
              className={`relative rounded-xl border ${cfg.border} ${cfg.bg} p-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-2 rounded-lg ${cfg.bg} ${cfg.color}`}
                  >
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-100 text-sm">
                      {service.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Checked {service.lastCheck}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${cfg.dot} animate-pulse`}
                  />
                  {cfg.icon}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">
                    Uptime
                  </p>
                  <p className={`text-sm font-semibold font-mono ${cfg.color}`}>
                    {service.uptime}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">
                    Latency
                  </p>
                  <p className="text-sm font-semibold font-mono text-slate-200">
                    {service.responseTime}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">
                    Req/min
                  </p>
                  <p className="text-sm font-semibold font-mono text-slate-200">
                    {service.requests}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
