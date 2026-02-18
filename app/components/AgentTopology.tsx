"use client";

import { useState } from "react";

interface Agent {
  id: string;
  name: string;
  status: string;
  model: string;
  tasks: number;
  icon: string;
}

export default function AgentTopology({ agents }: { agents: Agent[] }) {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const commander = agents.find((a) => a.id === "commander");
  const subAgents = agents.filter((a) => a.id !== "commander");

  return (
    <div className="bg-[#111] border border-[#222] rounded-xl p-5 h-full">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Agent Topology
      </h2>

      {/* Commander node */}
      {commander && (
        <div
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all mb-4 ${
            selectedAgent === commander.id
              ? "border-[#00d4ff] bg-[#00d4ff]/10"
              : "border-[#333] bg-[#0a0a0a] hover:border-[#444]"
          }`}
          onClick={() => setSelectedAgent(selectedAgent === commander.id ? null : commander.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{commander.icon}</span>
              <div>
                <div className="font-semibold">{commander.name}</div>
                <div className="text-xs text-gray-500">Orchestrator • agents-as-tools</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse-glow" />
              <span className="text-xs text-[#00ff88]">active</span>
            </div>
          </div>
          {selectedAgent === commander.id && (
            <div className="mt-3 pt-3 border-t border-[#222] text-xs text-gray-400 space-y-1">
              <p>Model: <span className="text-[#ffaa00]">amazon.nova-pro-v1:0</span></p>
              <p>Pattern: <span className="text-[#00d4ff]">agents-as-tools</span></p>
              <p>Tasks completed: <span className="text-white">{commander.tasks}</span></p>
              <p>Sub-agents: <span className="text-white">{subAgents.length}</span></p>
            </div>
          )}
        </div>
      )}

      {/* Connection lines */}
      <div className="flex justify-center mb-2">
        <div className="w-px h-4 bg-gradient-to-b from-[#00d4ff] to-[#333]" />
      </div>
      <div className="flex justify-center mb-4">
        <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-[#333] to-transparent" />
      </div>

      {/* Sub-agents */}
      <div className="grid grid-cols-2 gap-3">
        {subAgents.map((agent) => (
          <div
            key={agent.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              selectedAgent === agent.id
                ? "border-[#00d4ff] bg-[#00d4ff]/10"
                : "border-[#222] bg-[#0a0a0a] hover:border-[#333]"
            }`}
            onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{agent.icon}</span>
              <span className="text-sm font-medium">{agent.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    agent.status === "active" ? "bg-[#00ff88] animate-pulse-glow" : "bg-[#ffaa00]"
                  }`}
                />
                <span className="text-xs text-gray-500">{agent.status}</span>
              </div>
              <span className="text-xs text-gray-600">{agent.tasks} tasks</span>
            </div>
            {selectedAgent === agent.id && (
              <div className="mt-2 pt-2 border-t border-[#222] text-xs text-gray-400 space-y-1">
                <p>Model: <span className="text-[#ffaa00]">nova-pro</span></p>
                <p>Tasks: <span className="text-white">{agent.tasks}</span></p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-[#222] flex items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#00ff88]" /> Active
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#ffaa00]" /> Idle
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#ff4444]" /> Error
        </div>
      </div>
    </div>
  );
}
