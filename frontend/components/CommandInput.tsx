"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, ChevronRight, Sparkles } from "lucide-react";

interface CommandHistory {
  command: string;
  response: string;
  timestamp: string;
  agent: string;
}

const exampleCommands = [
  "nova status --all",
  "nova incident analyze INC-2847",
  "nova scale api-gateway --replicas 5",
  "nova rollback deploy v2.14.2",
  "nova report --last 24h",
];

const mockHistory: CommandHistory[] = [
  {
    command: "nova status --services",
    response:
      "✓ API Gateway: healthy (42ms) | ✓ PostgreSQL: healthy (8ms) | ⚠ Redis: degraded (124ms) | ✓ Queue: healthy (15ms)",
    timestamp: "14:32:18",
    agent: "Commander",
  },
  {
    command: "nova incident analyze INC-2846",
    response:
      "Analyst Agent: P99 latency spike correlates with deploy v2.14.2 at 14:15 UTC. Redis connection pool saturation detected. Recommendation: rollback or increase pool size to 200.",
    timestamp: "14:28:45",
    agent: "Analyst",
  },
  {
    command: "nova agents health",
    response:
      "All 5 agents operational. Commander: active | Monitor: processing | Analyst: active | Voice: idle | Dashboard: active. Total tasks processed: 567",
    timestamp: "14:25:10",
    agent: "Commander",
  },
];

export default function CommandInput() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>(mockHistory);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newEntry: CommandHistory = {
      command: input,
      response:
        "Commander Agent: Processing command... Routing to appropriate sub-agent for execution. ETA: <2s",
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      agent: "Commander",
    };

    setHistory([newEntry, ...history]);
    setInput("");
    setPlaceholderIdx((prev) => (prev + 1) % exampleCommands.length);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          Command Center
        </h2>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400">
          <Sparkles className="w-3 h-3" />
          <span className="font-mono">AI-powered</span>
        </div>
      </div>

      {/* Command Input */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 p-2 focus-within:border-cyan-400/50 transition-colors">
          <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={exampleCommands[placeholderIdx]}
            className="flex-1 bg-transparent text-sm font-mono text-slate-100 placeholder:text-slate-600 outline-none"
          />
          <button
            type="submit"
            className="p-1.5 rounded-md bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Quick Commands */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {["status", "incidents", "scale", "rollback", "report"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => setInput(`nova ${cmd} `)}
            className="px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* History */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        <AnimatePresence>
          {history.map((entry, i) => (
            <motion.div
              key={`${entry.timestamp}-${i}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded-lg bg-slate-900/50 border border-slate-800 p-3"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono text-slate-500">
                  {entry.timestamp}
                </span>
                <span className="text-[10px] font-mono text-cyan-400/60 px-1 py-0.5 bg-cyan-400/5 rounded">
                  {entry.agent}
                </span>
              </div>
              <div className="flex items-start gap-2 mb-1.5">
                <ChevronRight className="w-3 h-3 text-cyan-400 mt-0.5 shrink-0" />
                <code className="text-xs font-mono text-slate-200">
                  {entry.command}
                </code>
              </div>
              <p className="text-xs text-slate-400 pl-5 leading-relaxed">
                {entry.response}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
