"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Shield,
  Eye,
  BarChart3,
  Mic,
  LayoutDashboard,
  Zap,
} from "lucide-react";

interface Agent {
  name: string;
  role: string;
  status: "active" | "idle" | "processing" | "standby";
  lastAction: string;
  taskCount: number;
  uptime: string;
  icon: React.ReactNode;
  color: string;
  model: string;
}

const agents: Agent[] = [
  {
    name: "Commander",
    role: "Orchestrator",
    status: "active",
    lastAction: "Dispatched auto-scale to Monitor Agent",
    taskCount: 47,
    uptime: "99.9%",
    icon: <Shield className="w-5 h-5" />,
    color: "emerald",
    model: "Nova Pro",
  },
  {
    name: "Monitor",
    role: "Infrastructure Watcher",
    status: "processing",
    lastAction: "Analyzing Redis cache metrics anomaly",
    taskCount: 183,
    uptime: "99.8%",
    icon: <Eye className="w-5 h-5" />,
    color: "blue",
    model: "Nova Lite",
  },
  {
    name: "Analyst",
    role: "Root Cause Analysis",
    status: "active",
    lastAction: "Correlating latency spike with deploy v2.14.2",
    taskCount: 34,
    uptime: "99.7%",
    icon: <BarChart3 className="w-5 h-5" />,
    color: "purple",
    model: "Nova Pro",
  },
  {
    name: "Voice",
    role: "Natural Language Interface",
    status: "idle",
    lastAction: "Processed voice command: 'status report'",
    taskCount: 12,
    uptime: "99.9%",
    icon: <Mic className="w-5 h-5" />,
    color: "cyan",
    model: "Nova Sonic",
  },
  {
    name: "Dashboard",
    role: "Visualization Engine",
    status: "active",
    lastAction: "Updated real-time metrics feed",
    taskCount: 291,
    uptime: "100%",
    icon: <LayoutDashboard className="w-5 h-5" />,
    color: "amber",
    model: "Nova Canvas",
  },
];

const statusStyles = {
  active: {
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
    label: "Active",
  },
  idle: {
    dot: "bg-slate-400",
    text: "text-slate-400",
    bg: "bg-slate-400/10",
    label: "Idle",
  },
  processing: {
    dot: "bg-blue-400",
    text: "text-blue-400",
    bg: "bg-blue-400/10",
    label: "Processing",
  },
  standby: {
    dot: "bg-amber-400",
    text: "text-amber-400",
    bg: "bg-amber-400/10",
    label: "Standby",
  },
};

const colorMap: Record<string, { icon: string; bg: string; border: string }> = {
  emerald: {
    icon: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
  blue: {
    icon: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  purple: {
    icon: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
  },
  cyan: {
    icon: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
  },
  amber: {
    icon: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
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
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

export default function AgentStatus() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <Bot className="w-5 h-5 text-purple-400" />
          Agent Status
        </h2>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
          <Zap className="w-3 h-3" />
          5/5 online
        </div>
      </div>
      <motion.div
        className="space-y-2.5"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {agents.map((agent) => {
          const stat = statusStyles[agent.status];
          const clr = colorMap[agent.color];
          return (
            <motion.div
              key={agent.name}
              variants={item}
              className={`rounded-lg border border-slate-800 bg-slate-900/50 p-3.5 hover:bg-slate-800/50 hover:border-slate-700 transition-all duration-200`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${clr.bg} ${clr.icon} shrink-0`}>
                  {agent.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-slate-100">
                        {agent.name}
                      </h3>
                      <span className="text-[10px] text-slate-500 font-mono px-1.5 py-0.5 bg-slate-800 rounded">
                        {agent.model}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${stat.dot} ${
                          agent.status === "active" || agent.status === "processing"
                            ? "animate-pulse"
                            : ""
                        }`}
                      />
                      <span
                        className={`text-[10px] font-medium ${stat.text}`}
                      >
                        {stat.label}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">{agent.role}</p>
                  <p className="text-xs text-slate-400 truncate mb-2">
                    ↳ {agent.lastAction}
                  </p>
                  <div className="flex items-center gap-4 text-[10px] text-slate-500">
                    <span className="font-mono">
                      Tasks: <span className="text-slate-300">{agent.taskCount}</span>
                    </span>
                    <span className="font-mono">
                      Uptime: <span className="text-emerald-400">{agent.uptime}</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
