"use client";

import { useState } from "react";
import { Terminal, Send, ChevronRight } from "lucide-react";

const commandHistory = [
  { input: "novaops health --all", output: "All 4 services healthy. Redis cache degraded (eviction rate: 87%).", time: "14:23:01" },
  { input: "novaops investigate INC-2846", output: "Commander delegated to Analyst. Root cause: connection pool exhaustion on inference-service.", time: "14:22:48" },
  { input: "novaops agents status", output: "5 agents online. Commander: active, Monitor: active, Analyst: processing, Voice: idle, Dashboard: active.", time: "14:22:30" },
];

export default function CommandInput() {
  const [input, setInput] = useState("");

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Terminal className="w-4 h-4 text-nova-400" />
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Command Terminal
        </h2>
      </div>

      {/* History */}
      <div className="bg-slate-950 rounded-lg border border-slate-800 p-3 font-mono text-xs space-y-2 max-h-40 overflow-y-auto">
        {commandHistory.map((cmd, i) => (
          <div key={i} className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">$</span>
              <span className="text-slate-200">{cmd.input}</span>
              <span className="text-slate-600 ml-auto">{cmd.time}</span>
            </div>
            <div className="text-slate-400 pl-4">{cmd.output}</div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 bg-slate-900 rounded-lg border border-slate-700 px-3 py-2 focus-within:border-nova-500/50 transition-colors">
        <ChevronRight className="w-4 h-4 text-nova-500 flex-shrink-0" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command... (e.g. novaops health, novaops investigate INC-2846)"
          className="flex-1 bg-transparent text-sm font-mono text-slate-200 placeholder:text-slate-600 outline-none"
        />
        <button className="p-1 hover:bg-slate-800 rounded transition-colors">
          <Send className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </div>
  );
}
