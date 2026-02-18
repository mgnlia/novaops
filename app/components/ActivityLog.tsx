"use client";

interface LogEntry {
  time: string;
  agent: string;
  action: string;
}

interface ActivityLogProps {
  logs: LogEntry[];
  activeIndex: number;
  demoMode: boolean;
}

const agentColor = (agent: string) => {
  const colors: Record<string, string> = {
    Commander: "#00d4ff",
    Monitor: "#00ff88",
    Analyst: "#ffaa00",
    Voice: "#ff6b9d",
    Dashboard: "#a78bfa",
  };
  return colors[agent] || "#888";
};

export default function ActivityLog({ logs, activeIndex, demoMode }: ActivityLogProps) {
  const visibleLogs = demoMode ? logs.slice(0, activeIndex + 1) : logs;

  return (
    <div className="bg-[#111] border border-[#222] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Activity Log
        </h2>
        {demoMode && (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ff4444] animate-pulse" />
            <span className="text-xs text-[#ff4444]">LIVE</span>
          </div>
        )}
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {visibleLogs.map((log, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 text-sm p-2 rounded transition-all ${
              demoMode && i === activeIndex
                ? "bg-[#00d4ff]/5 border border-[#00d4ff]/20"
                : "border border-transparent"
            }`}
          >
            <span className="text-xs text-gray-600 font-mono min-w-[65px]">{log.time}</span>
            <span
              className="text-xs font-medium min-w-[80px]"
              style={{ color: agentColor(log.agent) }}
            >
              {log.agent}
            </span>
            <span className="text-gray-400 text-xs">{log.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
