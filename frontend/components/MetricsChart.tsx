"use client";

import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const latencyData = [
  { time: "00:00", p50: 32, p95: 78, p99: 145 },
  { time: "01:00", p50: 28, p95: 65, p99: 120 },
  { time: "02:00", p50: 25, p95: 55, p99: 98 },
  { time: "03:00", p50: 22, p95: 48, p99: 85 },
  { time: "04:00", p50: 20, p95: 42, p99: 78 },
  { time: "05:00", p50: 24, p95: 52, p99: 95 },
  { time: "06:00", p50: 35, p95: 82, p99: 155 },
  { time: "07:00", p50: 45, p95: 110, p99: 210 },
  { time: "08:00", p50: 52, p95: 125, p99: 240 },
  { time: "09:00", p50: 48, p95: 115, p99: 225 },
  { time: "10:00", p50: 42, p95: 98, p99: 185 },
  { time: "11:00", p50: 55, p95: 135, p99: 280 },
  { time: "12:00", p50: 62, p95: 155, p99: 320 },
  { time: "13:00", p50: 58, p95: 140, p99: 290 },
  { time: "14:00", p50: 85, p95: 210, p99: 450 },
  { time: "14:35", p50: 65, p95: 160, p99: 340 },
];

const throughputData = [
  { time: "00:00", rps: 2400, errors: 12 },
  { time: "01:00", rps: 1800, errors: 8 },
  { time: "02:00", rps: 1200, errors: 5 },
  { time: "03:00", rps: 800, errors: 3 },
  { time: "04:00", rps: 600, errors: 2 },
  { time: "05:00", rps: 1100, errors: 6 },
  { time: "06:00", rps: 2800, errors: 15 },
  { time: "07:00", rps: 5200, errors: 28 },
  { time: "08:00", rps: 7800, errors: 42 },
  { time: "09:00", rps: 9200, errors: 38 },
  { time: "10:00", rps: 10500, errors: 45 },
  { time: "11:00", rps: 11200, errors: 52 },
  { time: "12:00", rps: 12400, errors: 58 },
  { time: "13:00", rps: 11800, errors: 48 },
  { time: "14:00", rps: 12100, errors: 85 },
  { time: "14:35", rps: 11500, errors: 62 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-slate-400 mb-1 font-mono">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs font-mono" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
            {entry.name.startsWith("p") ? "ms" : entry.name === "rps" ? " req/s" : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function MetricsChart() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          Performance Metrics
        </h2>
        <span className="text-xs text-slate-500 font-mono">Last 24h</span>
      </div>

      {/* Summary Stats */}
      <motion.div
        className="grid grid-cols-4 gap-3 mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {[
          {
            label: "Avg Latency",
            value: "42ms",
            change: "-8%",
            positive: true,
          },
          {
            label: "Throughput",
            value: "12.4K/s",
            change: "+15%",
            positive: true,
          },
          {
            label: "Error Rate",
            value: "0.42%",
            change: "+0.1%",
            positive: false,
          },
          {
            label: "Availability",
            value: "99.98%",
            change: "+0.01%",
            positive: true,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-slate-800 bg-slate-900/50 p-3"
          >
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
              {stat.label}
            </p>
            <div className="flex items-end gap-2">
              <span className="text-xl font-bold font-mono text-slate-100">
                {stat.value}
              </span>
              <span
                className={`flex items-center text-[10px] font-mono ${
                  stat.positive ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {stat.positive ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Latency Chart */}
      <motion.div
        className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-slate-300">
            Request Latency (ms)
          </h3>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-0.5 bg-emerald-400 rounded" /> P50
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-0.5 bg-amber-400 rounded" /> P95
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-0.5 bg-red-400 rounded" /> P99
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={latencyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="time"
              stroke="#475569"
              tick={{ fill: "#64748b", fontSize: 10 }}
              tickLine={false}
            />
            <YAxis
              stroke="#475569"
              tick={{ fill: "#64748b", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="p50"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              name="p50"
            />
            <Line
              type="monotone"
              dataKey="p95"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              name="p95"
            />
            <Line
              type="monotone"
              dataKey="p99"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              name="p99"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Throughput Chart */}
      <motion.div
        className="rounded-lg border border-slate-800 bg-slate-900/50 p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-slate-300">
            Throughput (req/s)
          </h3>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-0.5 bg-blue-400 rounded" /> Requests
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-0.5 bg-red-400/50 rounded" /> Errors
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={throughputData}>
            <defs>
              <linearGradient id="rpsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="errorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="time"
              stroke="#475569"
              tick={{ fill: "#64748b", fontSize: 10 }}
              tickLine={false}
            />
            <YAxis
              stroke="#475569"
              tick={{ fill: "#64748b", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="rps"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#rpsGradient)"
              name="rps"
            />
            <Area
              type="monotone"
              dataKey="errors"
              stroke="#ef4444"
              strokeWidth={1.5}
              fill="url(#errorGradient)"
              name="errors"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
