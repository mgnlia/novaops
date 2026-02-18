# NovaOps Frontend Dashboard

> AI-Powered DevOps Command Center — Phase 3 Frontend

A polished, dark-themed Next.js dashboard for the NovaOps multi-agent DevOps platform. Built for the **Amazon Nova AI Hackathon 2025**.

## 🚀 Tech Stack

- **Next.js 14** — App Router, Server Components, API Routes
- **React 18** — Client-side interactivity
- **Tailwind CSS 4** — Utility-first dark theme styling
- **Framer Motion** — Smooth animations and transitions
- **Recharts** — Performance metrics visualization
- **Lucide React** — Beautiful icon system
- **TypeScript** — Full type safety

## 📊 Dashboard Sections

### Service Health
Real-time status cards for API Gateway, PostgreSQL, Redis Cache, and Message Queue with uptime, latency, and request rate metrics.

### Active Incidents
Live incident feed with severity badges (critical/high/medium/low/info), status tracking, timestamps, and agent assignments.

### Performance Metrics
- **Summary Stats** — Avg latency, throughput, error rate, availability
- **Latency Chart** — P50/P95/P99 line chart over 24h
- **Throughput Chart** — Request/s area chart with error overlay

### Agent Hierarchy (DAG)
Visual directed acyclic graph showing the Commander orchestrator connected to 4 sub-agents (Monitor, Analyst, Voice, Dashboard) in the agents-as-tools pattern.

### Agent Status
Detailed status cards for all 5 agents showing model type, current task, task count, and uptime.

### Command Center
Terminal-style interface for sending natural language commands to the Commander agent with command history and quick-action buttons.

## 🔌 API Routes

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | Service health status for all infrastructure components |
| `GET /api/incidents` | Active and historical incidents with timelines |
| `GET /api/agents` | Agent status, capabilities, and hierarchy |
| `GET /api/metrics` | Time-series performance metrics (24h) |

## 🏃 Running Locally

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🏗️ Architecture

This frontend is the visualization layer of the NovaOps platform:

```
┌─────────────────────────────────────────┐
│           NovaOps Dashboard             │
│         (Next.js 14 + React)            │
├─────────────────────────────────────────┤
│  Service Health │ Incidents │ Metrics   │
│  Agent Graph    │ Agent Status          │
│  Command Center                         │
├─────────────────────────────────────────┤
│            API Routes (Mock)            │
│   /api/health  /api/incidents           │
│   /api/agents  /api/metrics             │
├─────────────────────────────────────────┤
│        NovaOps Backend (Python)         │
│     Strands Agents SDK + Amazon Nova    │
│  Commander → Monitor, Analyst, Voice    │
└─────────────────────────────────────────┘
```

## 📦 Deployment

Deployed on **Vercel** via the NovaOps CI pipeline.

---

*Built for the Amazon Nova AI Hackathon 2025*
