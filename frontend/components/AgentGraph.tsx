"use client";

import { Shield, Bot, BarChart3, Mic, LayoutDashboard } from "lucide-react";

interface AgentNode {
  name: string;
  icon: React.ReactNode;
  color: string;
  tools: string[];
}

const subAgents: AgentNode[] = [
  {
    name: "Monitor",
    icon: <Bot className="w-4 h-4" />,
    color: "border-emerald-500/40 bg-emerald-500/5",
    tools: ["check_health", "get_metrics"],
  },
  {
    name: "Analyst",
    icon: <BarChart3 className="w-4 h-4" />,
    color: "border-amber-500/40 bg-amber-500/5",
    tools: ["root_cause", "search_incidents"],
  },
  {
    name: "Voice",
    icon: <Mic className="w-4 h-4" />,
    color: "border-purple-500/40 bg-purple-500/5",
    tools: ["text_to_speech", "voice_alert"],
  },
  {
    name: "Dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
    color: "border-blue-500/40 bg-blue-500/5",
    tools: ["create_incident", "update_status"],
  },
];

export default function AgentGraph() {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
        Agent Topology — Agents-as-Tools
      </h2>

      <div className="relative flex flex-col items-center py-4">
        {/* Commander Node */}
        <div className="relative z-10 flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-nova-500/50 bg-nova-500/10 glow-blue">
          <Shield className="w-5 h-5 text-nova-400" />
          <div>
            <p className="text-sm font-bold text-nova-300">Commander</p>
            <p className="text-[10px] text-slate-500">Orchestrator · Nova Pro</p>
          </div>
        </div>

        {/* Connection Lines SVG */}
        <svg
          className="w-full h-12"
          viewBox="0 0 400 48"
          preserveAspectRatio="xMidYMid meet"
        >
          <line x1="200" y1="0" x2="50" y2="48" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="200" y1="0" x2="150" y2="48" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="200" y1="0" x2="250" y2="48" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="200" y1="0" x2="350" y2="48" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 2" />
          {/* Animated dots on lines */}
          {[50, 150, 250, 350].map((x, i) => (
            <circle key={i} r="2" fill="#2aa3ff" opacity="0.8">
              <animateMotion
                dur={`${1.5 + i * 0.3}s`}
                repeatCount="indefinite"
                path={`M200,0 L${x},48`}
              />
            </circle>
          ))}
        </svg>

        {/* Sub-Agent Nodes */}
        <div className="grid grid-cols-4 gap-3 w-full">
          {subAgents.map((agent) => (
            <div
              key={agent.name}
              className={`flex flex-col items-center p-3 rounded-lg border ${agent.color} transition-all hover:scale-105`}
            >
              <div className="text-slate-300 mb-1">{agent.icon}</div>
              <p className="text-xs font-semibold text-slate-200">{agent.name}</p>
              <div className="mt-1.5 space-y-0.5">
                {agent.tools.map((tool) => (
                  <p
                    key={tool}
                    className="text-[9px] font-mono text-slate-500 text-center"
                  >
                    @{tool}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Label */}
        <p className="mt-3 text-[10px] text-slate-600 text-center">
          Commander invokes sub-agents as tools via Strands Agents SDK · Amazon Bedrock
        </p>
      </div>
    </div>
  );
}
