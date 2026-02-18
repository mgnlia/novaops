"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Zap,
  ChevronRight,
  AlertTriangle,
  Search,
  Wrench,
  CheckCircle2,
  Radio,
  Shield,
  Eye,
  BarChart3,
  Mic,
  LayoutDashboard,
} from "lucide-react";
import { useDemo } from "@/lib/use-demo";
import { DemoEvent, DemoPhase } from "@/lib/demo-engine";

const phaseConfig: Record<
  DemoPhase,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  idle: {
    label: "Ready",
    color: "text-slate-400",
    bg: "bg-slate-400/10",
    icon: <Radio className="w-3.5 h-3.5" />,
  },
  detection: {
    label: "Detection",
    color: "text-red-400",
    bg: "bg-red-400/10",
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
  },
  triage: {
    label: "Triage",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    icon: <Shield className="w-3.5 h-3.5" />,
  },
  analysis: {
    label: "Analysis",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    icon: <Search className="w-3.5 h-3.5" />,
  },
  mitigation: {
    label: "Mitigation",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    icon: <Wrench className="w-3.5 h-3.5" />,
  },
  resolution: {
    label: "Resolution",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
  complete: {
    label: "Complete",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
};

const agentIcons: Record<string, React.ReactNode> = {
  Commander: <Shield className="w-3.5 h-3.5" />,
  Monitor: <Eye className="w-3.5 h-3.5" />,
  Analyst: <BarChart3 className="w-3.5 h-3.5" />,
  Voice: <Mic className="w-3.5 h-3.5" />,
  Dashboard: <LayoutDashboard className="w-3.5 h-3.5" />,
};

const agentColorMap: Record<string, { text: string; bg: string; border: string }> = {
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
  },
  blue: {
    text: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/30",
  },
  purple: {
    text: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
  },
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/30",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/30",
  },
};

function EventCard({ event, index }: { event: DemoEvent; index: number }) {
  const colors = agentColorMap[event.agentColor] || agentColorMap.emerald;
  const phaseCfg = phaseConfig[event.phase];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative rounded-lg border ${colors.border} bg-slate-900/70 p-3 backdrop-blur-sm`}
    >
      {/* Timeline connector */}
      {index > 0 && (
        <div className="absolute -top-3 left-5 w-px h-3 bg-slate-700" />
      )}

      <div className="flex items-start gap-3">
        {/* Agent icon */}
        <div className={`p-1.5 rounded-md ${colors.bg} ${colors.text} shrink-0 mt-0.5`}>
          {agentIcons[event.agent] || <Zap className="w-3.5 h-3.5" />}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-[10px] font-semibold ${colors.text}`}>
              {event.agent} Agent
            </span>
            <span
              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium ${phaseCfg.bg} ${phaseCfg.color}`}
            >
              {phaseCfg.icon}
              {phaseCfg.label}
            </span>
          </div>

          {/* Message */}
          <p className="text-xs text-slate-200 font-medium mb-1">
            {event.message}
          </p>

          {/* Detail */}
          <p className="text-[11px] text-slate-500 leading-relaxed">
            {event.detail}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function DemoMode() {
  const { state, scenarios, startDemo, pauseDemo, resumeDemo, stopDemo } =
    useDemo();
  const phaseCfg = phaseConfig[state.phase];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Interactive Demo
        </h2>
        {state.isRunning && (
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold ${phaseCfg.bg} ${phaseCfg.color}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${phaseCfg.color.replace(
                  "text-",
                  "bg-"
                )} animate-pulse`}
              />
              {phaseCfg.label}
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              {state.progress}%
            </span>
          </div>
        )}
      </div>

      {/* Scenario Selector (when idle) */}
      {!state.isRunning && state.phase !== "complete" && (
        <motion.div
          className="space-y-2.5 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs text-slate-500 mb-3">
            Launch a simulated incident to see all 5 AI agents collaborate in
            real-time:
          </p>
          {scenarios.map((scenario, i) => (
            <motion.button
              key={scenario.name}
              onClick={() => startDemo(i)}
              className="w-full text-left rounded-lg border border-slate-800 bg-slate-900/50 p-3.5 hover:bg-slate-800/50 hover:border-emerald-400/30 transition-all duration-200 group"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{scenario.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                      {scenario.name}
                    </h3>
                    <Play className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {scenario.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Controls (when running) */}
      {(state.isRunning || state.phase === "complete") && (
        <div className="flex items-center gap-2 mb-4">
          {state.isRunning && !state.isPaused && (
            <button
              onClick={pauseDemo}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-medium hover:bg-amber-400/20 transition-colors"
            >
              <Pause className="w-3 h-3" />
              Pause
            </button>
          )}
          {state.isPaused && (
            <button
              onClick={resumeDemo}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-medium hover:bg-emerald-400/20 transition-colors"
            >
              <Play className="w-3 h-3" />
              Resume
            </button>
          )}
          <button
            onClick={stopDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-400/10 border border-red-400/30 text-red-400 text-xs font-medium hover:bg-red-400/20 transition-colors"
          >
            <Square className="w-3 h-3" />
            Stop
          </button>
          {state.phase === "complete" && (
            <button
              onClick={() => startDemo(0)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-medium hover:bg-emerald-400/20 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Replay
            </button>
          )}

          {/* Progress bar */}
          <div className="flex-1 ml-2">
            <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                initial={{ width: "0%" }}
                animate={{ width: `${state.progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Scenario info */}
      {state.scenario && state.isRunning && (
        <div className="flex items-center gap-2 mb-3 px-2">
          <span className="text-sm">{state.scenario.icon}</span>
          <span className="text-xs font-medium text-slate-300">
            {state.scenario.name}
          </span>
        </div>
      )}

      {/* Event Feed */}
      {state.events.length > 0 && (
        <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
          <AnimatePresence mode="popLayout">
            {[...state.events].reverse().map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                index={state.events.length - 1 - i}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Completion summary */}
      {state.phase === "complete" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-400/5 p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-400">
              Demo Complete
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            All 5 NovaOps agents collaborated to detect, triage, analyze, and
            resolve the incident autonomously. The agents-as-tools pattern
            enabled the Commander to orchestrate the full lifecycle without human
            intervention.
          </p>
          <div className="flex items-center gap-4 mt-3 text-[10px] font-mono text-slate-500">
            <span>
              Agents: <span className="text-emerald-400">5/5</span>
            </span>
            <span>
              Events: <span className="text-emerald-400">{state.events.length}</span>
            </span>
            <span>
              Pattern: <span className="text-emerald-400">agents-as-tools</span>
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
