"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  Clock,
  Activity,
  Github,
  ExternalLink,
} from "lucide-react";
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
      <motion.header
        className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-[1600px] mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-400/20">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-lg font-bold tracking-tight">
                    <span className="text-emerald-400">Nova</span>
                    <span className="text-slate-100">Ops</span>
                  </h1>
                  <p className="text-[10px] text-slate-500 -mt-0.5 font-mono">
                    AI-Powered DevOps Command Center
                  </p>
                </div>
              </div>

              {/* Separator */}
              <div className="h-8 w-px bg-slate-800" />

              {/* Status badges */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-medium text-emerald-400">
                    System Operational
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span className="text-[11px] font-mono text-slate-400">
                    5 agents active
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                <span className="font-mono">
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="h-5 w-px bg-slate-800" />
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-[11px] text-slate-400 font-mono">
                <Activity className="w-3 h-3 text-emerald-400" />
                v2.14.3
              </div>
              <a
                href="https://github.com/mgnlia/novaops"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-[11px] text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-6">
        {/* Top Row: Service Health + Incidents */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          <motion.section
            className="col-span-5 rounded-xl border border-slate-800 bg-slate-900/30 p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ServiceHealth />
          </motion.section>

          <motion.section
            className="col-span-7 rounded-xl border border-slate-800 bg-slate-900/30 p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <IncidentFeed />
          </motion.section>
        </div>

        {/* Middle Row: Metrics */}
        <motion.section
          className="rounded-xl border border-slate-800 bg-slate-900/30 p-5 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <MetricsChart />
        </motion.section>

        {/* Bottom Row: Agent Graph + Agent Status + Command */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          <motion.section
            className="col-span-5 rounded-xl border border-slate-800 bg-slate-900/30 p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AgentGraph />
          </motion.section>

          <motion.section
            className="col-span-3 rounded-xl border border-slate-800 bg-slate-900/30 p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <AgentStatus />
          </motion.section>

          <motion.section
            className="col-span-4 rounded-xl border border-slate-800 bg-slate-900/30 p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <CommandInput />
          </motion.section>
        </div>

        {/* Footer */}
        <motion.footer
          className="border-t border-slate-800 pt-4 pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400/50" />
              <span>
                NovaOps — AI-Powered DevOps Command Center
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono">
                Powered by Amazon Nova &middot; Strands Agents SDK
              </span>
              <span>Amazon Nova AI Hackathon 2025</span>
            </div>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}
