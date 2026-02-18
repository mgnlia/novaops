"use client";

interface Metric {
  label: string;
  value: string;
  trend: string;
  color: string;
}

export default function MetricsPanel({ metrics }: { metrics: Metric[] }) {
  const trendIcon = (trend: string) => {
    switch (trend) {
      case "up": return "↑";
      case "down": return "↓";
      default: return "→";
    }
  };

  return (
    <div className="bg-[#111] border border-[#222] rounded-xl p-5">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        System Metrics
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-[#0a0a0a] border border-[#222] rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold" style={{ color: metric.color }}>
                {metric.value}
              </span>
              <span
                className={`text-xs ${
                  metric.trend === "up" && metric.label !== "Uptime" && metric.label !== "API Latency"
                    ? "text-[#ff4444]"
                    : "text-[#00ff88]"
                }`}
              >
                {trendIcon(metric.trend)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
