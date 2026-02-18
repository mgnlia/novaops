"use client";

import { useState } from "react";

const DEMO_RESPONSES: Record<string, string> = {
  help: "Available commands: status, agents, incidents, metrics, rca <incident>, clear",
  status: "✅ All systems operational. 4/5 agents active. No critical incidents.",
  agents: "🎯 Commander: active | 📡 Monitor: active | 🔬 Analyst: active | 🔊 Voice: idle | 📊 Dashboard: active",
  incidents: "3 incidents in last 24h (2 critical, 1 warning). All resolved. MTTR: 4.2m",
  metrics: "Uptime: 99.97% | Latency: 142ms | Error rate: 0.02% | Cost: $2.47/24h",
  "rca inc-2847": "RCA for INC-2847: Root cause identified as upstream timeout in payment-svc v2.3.2. Auto-rollback to v2.3.1 resolved the issue in 3.2m.",
  clear: "",
};

interface TerminalLine {
  type: "input" | "output";
  text: string;
}

export default function CommandTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", text: "NovaOps CLI v0.2.0 — Type 'help' for commands" },
    { type: "output", text: "Connected to Commander Agent (nova-pro-v1:0)" },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newLines = [...lines, { type: "input" as const, text: `$ novaops ${cmd}` }];

    if (cmd === "clear") {
      setLines([{ type: "output", text: "NovaOps CLI v0.2.0 — Type 'help' for commands" }]);
    } else {
      const response = DEMO_RESPONSES[cmd] || `Unknown command: ${cmd}. Type 'help' for available commands.`;
      newLines.push({ type: "output", text: response });
      setLines(newLines);
    }
    setInput("");
  };

  return (
    <div className="bg-[#111] border border-[#222] rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Command Terminal
        </h2>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff4444]/60" />
          <div className="w-3 h-3 rounded-full bg-[#ffaa00]/60" />
          <div className="w-3 h-3 rounded-full bg-[#00ff88]/60" />
        </div>
      </div>
      <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-3 font-mono text-sm h-48 overflow-y-auto flex flex-col">
        <div className="flex-1 space-y-1">
          {lines.map((line, i) => (
            <div
              key={i}
              className={line.type === "input" ? "text-[#00d4ff]" : "text-gray-400"}
            >
              {line.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2 pt-2 border-t border-[#222]">
          <span className="text-[#00ff88]">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-600"
            placeholder="novaops <command>"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
