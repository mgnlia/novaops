"use client";

interface Incident {
  id: number;
  time: string;
  severity: string;
  title: string;
  agent: string;
  status: string;
  duration: string;
}

export default function IncidentTimeline({ incidents }: { incidents: Incident[] }) {
  const severityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "#ff4444";
      case "warning": return "#ffaa00";
      default: return "#00d4ff";
    }
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      resolved: "text-[#00ff88] bg-[#00ff88]/10",
      mitigated: "text-[#ffaa00] bg-[#ffaa00]/10",
      active: "text-[#ff4444] bg-[#ff4444]/10",
    };
    return colors[status] || colors.resolved;
  };

  return (
    <div className="bg-[#111] border border-[#222] rounded-xl p-5">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Incident Timeline (24h)
      </h2>
      <div className="space-y-3">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="flex items-start gap-3 p-3 bg-[#0a0a0a] border border-[#222] rounded-lg hover:border-[#333] transition-colors"
          >
            <div className="flex flex-col items-center gap-1 min-w-[40px]">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: severityColor(incident.severity) }}
              />
              <span className="text-xs text-gray-600">{incident.time}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{incident.title}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">by {incident.agent}</span>
                <span className="text-xs text-gray-600">•</span>
                <span className="text-xs text-gray-500">{incident.duration}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${statusBadge(incident.status)}`}>
                  {incident.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
