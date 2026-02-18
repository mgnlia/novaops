"use client";

import { Zap, Shield } from "lucide-react";
import ServiceHealth from "@/components/ServiceHealth";
import IncidentFeed from "@/components/IncidentFeed";
import AgentStatus from "@/components/AgentStatus";
import MetricsChart from "@/components/MetricsChart";
import CommandInput from "@/components/CommandInput";
import AgentGraph from "@/components/AgentGraph";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-nova-500/20 border border-nova-500/30">
              <Zap className="w-4 h-4 text-nova-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-100 tracking-tight">
                NovaOps
              </h1>
              <p className="text-[10px] text-slate-500 -mt-0.5">
                AI-Powered DevOps Command Center
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-slow" />
              <span className="text-xs text-emerald-400 font-medium">
                System Operational
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Shield className="w-3.5 h-3.5" />
              <span>Strands Agents SDK</span>
              <span className="text-slate-700">·</span>
              <span>Amazon Nova Pro</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column — Services + Incidents */}
          <div className="col-span-4 space-y-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
              <ServiceHealth />
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
              <IncidentFeed />
            </div>
          </div>

          {/* Center Column — Metrics + Agent Graph */}
          <div className="col-span-5 space-y-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
              <MetricsChart />
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
              <AgentGraph />
            </div>
          </div>

          {/* Right Column — Agent Status */}
          <div className="col-span-3 space-y-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
              <AgentStatus />
            </div>
          </div>

          {/* Full Width — Command Terminal */}
          <div className="col-span-12">
            <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
              <CommandInput />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-xs text-slate-600">
          <span>
            NovaOps v0.1.0 — Amazon Nova AI Hackathon Submission
          </span>
          <span>
            Powered by Strands Agents SDK · Amazon Bedrock · Nova Pro
          </span>
        </div>
      </footer>
    </div>
  );
}
