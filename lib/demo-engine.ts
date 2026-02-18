// NovaOps Demo Engine — Simulates a full incident lifecycle through all 5 agents

export type DemoPhase =
  | "idle"
  | "detection"
  | "triage"
  | "analysis"
  | "mitigation"
  | "resolution"
  | "complete";

export interface DemoEvent {
  id: string;
  phase: DemoPhase;
  agent: string;
  agentColor: string;
  message: string;
  detail: string;
  timestamp: number;
  type: "detection" | "delegation" | "analysis" | "action" | "resolution" | "info";
}

export interface DemoScenario {
  name: string;
  description: string;
  icon: string;
  events: Omit<DemoEvent, "id" | "timestamp">[];
}

export const scenarios: DemoScenario[] = [
  {
    name: "API Gateway Cascade Failure",
    description: "Simulates a cascading failure from API gateway timeout → database connection pool exhaustion → auto-remediation",
    icon: "🔥",
    events: [
      {
        phase: "detection",
        agent: "Monitor",
        agentColor: "blue",
        message: "Anomaly detected: API Gateway P99 latency spike to 4200ms",
        detail: "Health check threshold exceeded. Triggering incident workflow.",
        type: "detection",
      },
      {
        phase: "detection",
        agent: "Monitor",
        agentColor: "blue",
        message: "Secondary alert: PostgreSQL connection pool at 92% capacity",
        detail: "Correlated metric anomaly detected within 30s window.",
        type: "detection",
      },
      {
        phase: "triage",
        agent: "Commander",
        agentColor: "emerald",
        message: "Incident INC-2850 created — Severity: CRITICAL",
        detail: "Commander routing to Analyst for root cause analysis. Notifying Voice Agent for broadcast.",
        type: "delegation",
      },
      {
        phase: "triage",
        agent: "Dashboard",
        agentColor: "amber",
        message: "Dashboard updated: INC-2850 status → INVESTIGATING",
        detail: "Real-time feed updated. Stakeholder view refreshed.",
        type: "info",
      },
      {
        phase: "triage",
        agent: "Voice",
        agentColor: "cyan",
        message: "Voice alert broadcast: CRITICAL incident on API Gateway",
        detail: "TTS alert generated via Nova Sonic. On-call team notified.",
        type: "action",
      },
      {
        phase: "analysis",
        agent: "Analyst",
        agentColor: "purple",
        message: "FAISS vector search: 3 similar historical incidents found",
        detail: "INC-2201 (94% match), INC-1847 (87% match), INC-1523 (72% match). Pattern: deploy-triggered connection leak.",
        type: "analysis",
      },
      {
        phase: "analysis",
        agent: "Analyst",
        agentColor: "purple",
        message: "Root cause identified: Connection pool leak in v2.14.2 ORM layer",
        detail: "Deployment v2.14.2 introduced unbounded connection acquisition in batch processor. Confidence: 94%.",
        type: "analysis",
      },
      {
        phase: "analysis",
        agent: "Commander",
        agentColor: "emerald",
        message: "Commander decision: Initiate auto-rollback to v2.14.1",
        detail: "High-confidence RCA + historical match → automated remediation approved.",
        type: "delegation",
      },
      {
        phase: "mitigation",
        agent: "Commander",
        agentColor: "emerald",
        message: "Executing rollback: v2.14.2 → v2.14.1 (zero-downtime)",
        detail: "Blue-green deployment swap initiated. Health checks monitoring.",
        type: "action",
      },
      {
        phase: "mitigation",
        agent: "Monitor",
        agentColor: "blue",
        message: "Rollback progress: 60% traffic shifted to v2.14.1",
        detail: "Connection pool utilization dropping: 92% → 67%. Latency improving.",
        type: "info",
      },
      {
        phase: "mitigation",
        agent: "Monitor",
        agentColor: "blue",
        message: "Rollback complete: 100% traffic on v2.14.1",
        detail: "All health checks passing. P99 latency: 145ms (nominal). Pool: 34%.",
        type: "action",
      },
      {
        phase: "resolution",
        agent: "Dashboard",
        agentColor: "amber",
        message: "Dashboard updated: INC-2850 status → RESOLVED",
        detail: "MTTR: 4m 12s. Auto-remediation successful. Post-mortem scheduled.",
        type: "resolution",
      },
      {
        phase: "resolution",
        agent: "Analyst",
        agentColor: "purple",
        message: "Post-incident embedding stored in FAISS index",
        detail: "New vector added for future similarity matching. Knowledge base updated.",
        type: "info",
      },
      {
        phase: "resolution",
        agent: "Voice",
        agentColor: "cyan",
        message: "All-clear broadcast: INC-2850 resolved via auto-rollback",
        detail: "Recovery notification sent to all channels. Incident closed.",
        type: "resolution",
      },
      {
        phase: "complete",
        agent: "Commander",
        agentColor: "emerald",
        message: "Incident lifecycle complete — 5 agents, 14 actions, 4m 12s MTTR",
        detail: "Full autonomous incident response demonstrated. Zero human intervention required.",
        type: "resolution",
      },
    ],
  },
  {
    name: "Memory Leak Detection",
    description: "Gradual memory pressure detected by Monitor → Analyst traces to specific microservice → Commander triggers remediation",
    icon: "🧠",
    events: [
      {
        phase: "detection",
        agent: "Monitor",
        agentColor: "blue",
        message: "Warning: auth-service memory usage trending upward — 78% → 89% in 15min",
        detail: "Predictive model forecasts OOM in ~22 minutes at current rate.",
        type: "detection",
      },
      {
        phase: "triage",
        agent: "Commander",
        agentColor: "emerald",
        message: "Incident INC-2851 created — Severity: HIGH (predictive)",
        detail: "Proactive incident creation before threshold breach. Routing to Analyst.",
        type: "delegation",
      },
      {
        phase: "triage",
        agent: "Voice",
        agentColor: "cyan",
        message: "Advisory alert: auth-service memory pressure detected",
        detail: "Non-critical voice notification to SRE channel.",
        type: "action",
      },
      {
        phase: "analysis",
        agent: "Analyst",
        agentColor: "purple",
        message: "Memory profile analysis: JWT token cache not evicting expired entries",
        detail: "Cache size growing linearly with request volume. No TTL configured on token store.",
        type: "analysis",
      },
      {
        phase: "analysis",
        agent: "Analyst",
        agentColor: "purple",
        message: "Historical match: INC-1999 (91% similarity) — same root cause",
        detail: "Previous fix: Add 1h TTL to token cache. Patch available in hotfix branch.",
        type: "analysis",
      },
      {
        phase: "mitigation",
        agent: "Commander",
        agentColor: "emerald",
        message: "Deploying hotfix: auth-service cache TTL patch",
        detail: "Rolling restart with config update. Expected memory normalization in ~5min.",
        type: "action",
      },
      {
        phase: "mitigation",
        agent: "Monitor",
        agentColor: "blue",
        message: "Memory stabilizing: 89% → 72% → 54% (post-eviction)",
        detail: "Cache eviction working. GC pressure normalized.",
        type: "info",
      },
      {
        phase: "resolution",
        agent: "Dashboard",
        agentColor: "amber",
        message: "INC-2851 resolved — Proactive remediation successful",
        detail: "MTTR: 3m 45s. Zero user impact (caught before threshold).",
        type: "resolution",
      },
      {
        phase: "complete",
        agent: "Commander",
        agentColor: "emerald",
        message: "Proactive incident resolved — Predictive detection prevented outage",
        detail: "5 agents collaborated. Issue resolved 18 minutes before projected OOM.",
        type: "resolution",
      },
    ],
  },
];

let eventIdCounter = 0;

export function createDemoEvents(scenario: DemoScenario): DemoEvent[] {
  const baseTime = Date.now();
  return scenario.events.map((event, i) => ({
    ...event,
    id: `demo-${++eventIdCounter}`,
    timestamp: baseTime + i * 2000,
  }));
}
