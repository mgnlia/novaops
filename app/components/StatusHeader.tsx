"use client";

interface StatusHeaderProps {
  currentTime: Date;
  demoMode: boolean;
  onToggleDemo: () => void;
}

export default function StatusHeader({ currentTime, demoMode, onToggleDemo }: StatusHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0066ff] flex items-center justify-center text-xl font-bold">
          N
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Nova<span className="text-[#00d4ff]">Ops</span>
          </h1>
          <p className="text-sm text-gray-500">Multi-Agent DevOps Command Center</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse-glow" />
          <span className="text-gray-400">System Operational</span>
        </div>
        <div className="text-sm text-gray-500 font-mono">
          {currentTime.toLocaleTimeString("en-US", { hour12: false })} UTC
        </div>
        <button
          onClick={onToggleDemo}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            demoMode
              ? "bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30"
              : "bg-[#222] text-gray-400 border border-[#333]"
          }`}
        >
          {demoMode ? "⚡ LIVE DEMO" : "DEMO OFF"}
        </button>
      </div>
    </header>
  );
}
