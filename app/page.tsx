"use client";

import { useState, useEffect } from "react";
import AgentTopology from "./components/AgentTopology";
import MetricsPanel from "./components/MetricsPanel";
import IncidentTimeline from "./components/IncidentTimeline";
import CommandTerminal from "./components/CommandTerminal";
import ActivityLog from "./components/ActivityLog";
import StatusHeader from "./components/StatusHeader";

// Demo data for interactive showcase
const DEMO_AGENTS = [
  { id: "commander", name: "Commander", status: "active", model: "nova-pro", tasks: 47, icon: "🎯" },
  { id: "monitor", name: "Monitor", status: "active", model: "nova-pro", tasks: 156, icon: "📡" },
  { id: "analyst", name: "Analyst", status: "active", model: "nova-pro", tasks: 89, icon: "🔬" },
  { id: "voice", name: "Voice", status: "idle", model: "nova-pro", tasks: 23, icon: "🔊" },
  { id: "dashboard", name: "Dashboard", status: "active", model: "nova-pro", tasks: 34, icon: "📊" },
];

const DEMO_METRICS = [
  { label: "Uptime", value: "99.97%", trend: "up", color: "#00ff88" },
  { label: "Incidents (24h)", value: "3", trend: "down", color: "#00d4ff" },
  { label: "MTTR", value: "4.2m", trend: "down", color: "#00ff88" },
  { label: "Agents Active", value: "4/5", trend: "stable", color: "#ffaa00" },
  { label: "API Latency", value: "142ms", trend: "up", color: "#00d4ff" },
  { label: "Cost (24h)", value: "$2.47", trend: "down", color: "#00ff88" },
];

const DEMO_INCIDENTS = [
  { id: 1, time: "14:32", severity: "critical", title: "API Gateway 5xx spike — us-east-1", agent: "Monitor", status: "resolved", duration: "3.2m" },
  { id: 2, time: "11:15", severity: "warning", title: "Lambda cold start latency > 2s", agent: "Analyst", status: "resolved", duration: "1.8m" },
  { id: 3, time: "09:47", severity: "info", title: "Auto-scaling triggered for ECS cluster", agent: "Monitor", status: "resolved", duration: "0.5m" },
  { id: 4, time: "08:22", severity: "warning", title: "DynamoDB read capacity approaching limit", agent: "Analyst", status: "mitigated", duration: "5.1m" },
  { id: 5, time: "03:11", severity: "critical", title: "RDS failover detected — primary restored", agent: "Commander", status: "resolved", duration: "8.7m" },
];

const DEMO_LOGS = [
  { time: "14:35:22", agent: "Commander", action: "Dispatched Monitor to investigate 5xx spike" },
  { time: "14:35:24", agent: "Monitor", action: "Querying CloudWatch metrics for API Gateway" },
  { time: "14:35:27", agent: "Analyst", action: "RCA: Upstream dependency timeout in payment-svc" },
  { time: "14:35:29", agent: "Commander", action: "Initiating rollback of payment-svc to v2.3.1" },
  { time: "14:35:31", agent: "Voice", action: "Alert sent to #ops-critical Slack channel" },
  { time: "14:35:33", agent: "Dashboard", action: "Incident INC-2847 created and tracked" },
  { time: "14:35:35", agent: "Monitor", action: "5xx rate returning to baseline (0.02%)" },
  { time: "14:35:38", agent: "Commander", action: "Incident resolved. MTTR: 3.2 minutes" },
];

export default function Home() {
  const [demoMode, setDemoMode] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeLogIndex, setActiveLogIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (demoMode) {
      const logTimer = setInterval(() => {
        setActiveLogIndex((prev) => (prev + 1) % DEMO_LOGS.length);
      }, 2000);
      return () => clearInterval(logTimer);
    }
  }, [demoMode]);

  return (
    <main className="min-h-screen p-4 md:p-6 max-w-[1600px] mx-auto">
      <StatusHeader
        currentTime={currentTime}
        demoMode={demoMode}
        onToggleDemo={() => setDemoMode(!demoMode)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {/* Left column — Agent Topology */}
        <div className="lg:col-span-1">
          <AgentTopology agents={DEMO_AGENTS} />
        </div>

        {/* Center column — Metrics + Incidents */}
        <div className="lg:col-span-1 space-y-4">
          <MetricsPanel metrics={DEMO_METRICS} />
          <IncidentTimeline incidents={DEMO_INCIDENTS} />
        </div>

        {/* Right column — Terminal + Activity */}
        <div className="lg:col-span-1 space-y-4">
          <CommandTerminal />
          <ActivityLog logs={DEMO_LOGS} activeIndex={activeLogIndex} demoMode={demoMode} />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-gray-500 border-t border-[#222] pt-4">
        <p>
          <span className="text-[#00d4ff]">NovaOps</span> — Multi-Agent DevOps Command Center |
          Powered by <span className="text-[#ffaa00]">Amazon Nova Pro</span> +{" "}
          <span className="text-[#00ff88]">Strands Agents SDK</span>
        </p>
        <p className="mt-1 text-gray-600">
          Built for the Amazon Nova AI Challenge 2025
        </p>
      </footer>
    </main>
  );
}
