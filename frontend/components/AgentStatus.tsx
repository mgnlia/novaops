"use client";

import { Bot, Shield, BarChart3, Mic, LayoutDashboard } from "lucide-react";

interface Agent {
  name: string;
  role: string;
  status: "active" | "idle" | "processing";
  lastAction: string;
  taskCount: number;
  model: string;
  icon: React.ReactNode;
}

const agents: Agent[] = [
  {
    name: "Commander",
    role: "Orchestrator",
    status: "active",
    lastAction: "Delegated INC-2846 to Analyst",
    taskCount: 142,
    model: "Nova Pro",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    name: "Monitor",
    role: "Health Checks",
    status: "active",
    lastAction: "Health scan completed (4 services)",
    taskCount: 1283,
    model: "Nova Pro",
    icon: <Bot className="w-5 h-5" />,
  },
  {
    name: "Analyst",
    role: "Root Cause Analysis",
    status: "processing",
    lastAction: "Analyzing INC-2847 cache eviction",
    taskCount: 67,
    model: "Nova Pro",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    name: "Voice",
    role: "Alerts & Notifications",
    status: "idle",
    lastAction: "Sent critical alert for INC-2846",
    taskCount: 34,
    model: "Nova Pro",
    icon: <Mic className="w-5 h-5" />,
  },
  {
    name: "Dashboard",
    role: "Incident Management",
    status: "active",
    lastAction: "Updated incident feed",
    taskCount: 89,
    model: "Nova Pro",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
];

const statusConfig = {
  active: {
    dot: "bg-emerald-500",
    text: "text-emerald-400",
    label: "Active",
  },
  idle: {
    dot: "bg-slate-500",
    text: "text-slate-400",
    label: "Idle",
  },
  processing: {
    dot: "bg-amber-500",
    text: "text-amber-400",
    label: "Processing",
  },
};

export default function AgentStatus() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Agent Fleet
        </h2>
        <span className="text-xs text-emerald-400">
          {agents.filter((a) => a.status === "active").length}/
          {agents.length} active
        </span>
      </div>
      <div className="space-y-2">
        {agents.map((agent) => {
          const cfg = statusConfig[agent.status];
          return (
            <div
              key={agent.name}
              className="rounded-lg border border-slate-800 bg-slate-900/50 p-3 hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-nova-400">{agent.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-100">
                      {agent.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      {agent.model}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{agent.role}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-2 h-2 rounded-full ${cfg.dot} ${
                      agent.status === "processing" ? "animate-pulse" : ""
                    }`}
                  />
                  <span className={`text-xs ${cfg.text}`}>{cfg.label}</span>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500 truncate pr-4">
                  {agent.lastAction}
                </span>
                <span className="text-slate-600 whitespace-nowrap">
                  {agent.taskCount} tasks
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
