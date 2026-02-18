"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  BarChart3,
  Mic,
  LayoutDashboard,
  Network,
} from "lucide-react";

interface AgentNode {
  name: string;
  role: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  bgColor: string;
  glowColor: string;
  status: "active" | "processing" | "idle";
  model: string;
}

const commander: AgentNode = {
  name: "Commander",
  role: "Orchestrator",
  icon: <Shield className="w-6 h-6" />,
  color: "text-emerald-400",
  borderColor: "border-emerald-400/40",
  bgColor: "bg-emerald-400/10",
  glowColor: "shadow-emerald-400/20",
  status: "active",
  model: "Nova Pro",
};

const subAgents: AgentNode[] = [
  {
    name: "Monitor",
    role: "Watcher",
    icon: <Eye className="w-5 h-5" />,
    color: "text-blue-400",
    borderColor: "border-blue-400/40",
    bgColor: "bg-blue-400/10",
    glowColor: "shadow-blue-400/20",
    status: "processing",
    model: "Nova Lite",
  },
  {
    name: "Analyst",
    role: "RCA Engine",
    icon: <BarChart3 className="w-5 h-5" />,
    color: "text-purple-400",
    borderColor: "border-purple-400/40",
    bgColor: "bg-purple-400/10",
    glowColor: "shadow-purple-400/20",
    status: "active",
    model: "Nova Pro",
  },
  {
    name: "Voice",
    role: "NL Interface",
    icon: <Mic className="w-5 h-5" />,
    color: "text-cyan-400",
    borderColor: "border-cyan-400/40",
    bgColor: "bg-cyan-400/10",
    glowColor: "shadow-cyan-400/20",
    status: "idle",
    model: "Nova Sonic",
  },
  {
    name: "Dashboard",
    role: "Visualizer",
    icon: <LayoutDashboard className="w-5 h-5" />,
    color: "text-amber-400",
    borderColor: "border-amber-400/40",
    bgColor: "bg-amber-400/10",
    glowColor: "shadow-amber-400/20",
    status: "active",
    model: "Nova Canvas",
  },
];

const statusDot: Record<string, string> = {
  active: "bg-emerald-400",
  processing: "bg-blue-400",
  idle: "bg-slate-400",
};

export default function AgentGraph() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <Network className="w-5 h-5 text-emerald-400" />
          Agent Hierarchy
        </h2>
        <span className="text-xs text-slate-500 font-mono">
          Agents-as-Tools DAG
        </span>
      </div>

      <div className="relative rounded-xl border border-slate-800 bg-slate-900/50 p-6 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

        {/* Commander Node */}
        <motion.div
          className="relative flex justify-center mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`relative flex items-center gap-3 px-5 py-3 rounded-xl border-2 ${commander.borderColor} ${commander.bgColor} shadow-lg ${commander.glowColor} backdrop-blur-sm`}
          >
            <div className={`${commander.color}`}>{commander.icon}</div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-bold text-sm ${commander.color}`}>
                  {commander.name}
                </h3>
                <span
                  className={`w-2 h-2 rounded-full ${
                    statusDot[commander.status]
                  } animate-pulse`}
                />
              </div>
              <p className="text-[10px] text-slate-400">{commander.role}</p>
              <p className="text-[9px] font-mono text-slate-500">
                {commander.model}
              </p>
            </div>
          </div>
        </motion.div>

        {/* SVG Connection Lines */}
        <svg
          className="w-full h-16 overflow-visible"
          viewBox="0 0 800 60"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="lineGradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="lineGradient3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="lineGradient4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {[
            { x: 100, grad: "url(#lineGradient1)" },
            { x: 300, grad: "url(#lineGradient2)" },
            { x: 500, grad: "url(#lineGradient3)" },
            { x: 700, grad: "url(#lineGradient4)" },
          ].map((line, i) => (
            <motion.path
              key={i}
              d={`M 400 0 Q 400 30 ${line.x} 60`}
              fill="none"
              stroke={line.grad}
              strokeWidth="2"
              strokeDasharray="6 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
            />
          ))}
          {/* Data flow dots */}
          {[100, 300, 500, 700].map((x, i) => (
            <motion.circle
              key={`dot-${i}`}
              r="3"
              fill="#22c55e"
              opacity="0.8"
              initial={{ offsetDistance: "0%" }}
              animate={{
                cx: [400, (400 + x) / 2, x],
                cy: [0, 30, 60],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>

        {/* Sub-Agent Nodes */}
        <motion.div
          className="grid grid-cols-4 gap-3 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {subAgents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              className={`relative flex flex-col items-center p-3 rounded-lg border ${agent.borderColor} ${agent.bgColor} backdrop-blur-sm hover:scale-105 transition-transform duration-200`}
            >
              <div className={`${agent.color} mb-1.5`}>{agent.icon}</div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <h4
                  className={`font-semibold text-xs ${agent.color} text-center`}
                >
                  {agent.name}
                </h4>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    statusDot[agent.status]
                  } ${agent.status !== "idle" ? "animate-pulse" : ""}`}
                />
              </div>
              <p className="text-[9px] text-slate-500 text-center">
                {agent.role}
              </p>
              <p className="text-[8px] font-mono text-slate-600 mt-0.5">
                {agent.model}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-slate-800">
          <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <span className="w-4 h-0.5 border-t-2 border-dashed border-emerald-400/40" />
            Tool invocation
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Active
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-blue-400" /> Processing
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <span className="w-2 h-2 rounded-full bg-slate-400" /> Idle
          </span>
        </div>
      </div>
    </div>
  );
}
