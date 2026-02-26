# NovaOps — Multi-Agent DevOps Command Center

> AI-powered incident response platform using Amazon Nova foundation models orchestrated via the AWS Strands Agents SDK.

**🔴 Live Demo:** [novaops-frontend.vercel.app](https://novaops-frontend.vercel.app)

Built for the [Amazon Nova AI Hackathon 2026](https://amazon-nova.devpost.com/) — Agentic AI Track

---

## What It Does

NovaOps is an autonomous DevOps command center where a **Commander agent** orchestrates a team of specialized sub-agents to detect, diagnose, and resolve infrastructure incidents in real time — with minimal human intervention.

When an incident occurs (e.g., API 5xx spike, latency degradation, capacity limits), the Commander automatically:

1. **Dispatches the Monitor agent** to gather metrics from CloudWatch, ECS, and API Gateway
2. **Tasks the Analyst agent** to perform root cause analysis using historical patterns and embeddings
3. **Triggers the Voice agent** to send alerts via TTS/STT to on-call channels
4. **Updates the Dashboard agent** to track incident lifecycle and resolution metrics

All agents communicate through the **agents-as-tools** pattern — the Commander treats each sub-agent as a callable tool, enabling dynamic multi-step orchestration.

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  NovaOps Dashboard               │
│         (Next.js 15 + Tailwind v4)               │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │  Agent    │ │ Metrics  │ │ Command Terminal │ │
│  │ Topology  │ │  Panel   │ │ (Interactive CLI)│ │
│  └──────────┘ └──────────┘ └──────────────────┘ │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │ Incident │ │ Activity │ │  Status Header   │ │
│  │ Timeline │ │   Log    │ │  (Live Clock)    │ │
│  └──────────┘ └──────────┘ └──────────────────┘ │
└───────────────────┬─────────────────────────────┘
                    │ REST / WebSocket
┌───────────────────▼─────────────────────────────┐
│              FastAPI Backend                      │
│                                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │           🎯 Commander Agent                 │ │
│  │        (Nova Pro via Bedrock)                │ │
│  │       agents-as-tools orchestrator           │ │
│  └──────┬──────┬──────┬──────┬─────────────────┘ │
│         │      │      │      │                    │
│  ┌──────▼┐ ┌──▼────┐ ┌▼────┐ ┌▼─────────┐       │
│  │📡     │ │🔬     │ │🔊   │ │📊        │       │
│  │Monitor│ │Analyst│ │Voice│ │Dashboard │       │
│  │Agent  │ │Agent  │ │Agent│ │Agent     │       │
│  └───────┘ └───────┘ └─────┘ └──────────┘       │
│                                                   │
│  Tools: infra, analysis, voice, dashboard         │
└───────────────────────────────────────────────────┘
                    │
          Amazon Bedrock (Nova Pro)
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **AI Models** | Amazon Nova Pro via Amazon Bedrock |
| **Agent Framework** | AWS Strands Agents SDK (agents-as-tools pattern) |
| **Backend** | Python 3.11+ / FastAPI / uvicorn / WebSockets |
| **Frontend** | Next.js 15 / React 19 / Tailwind CSS v4 |
| **Package Manager** | uv (Python) / npm (Node.js) |
| **Deployment** | Vercel (frontend) |

## Features

- **🎯 Commander Agent** — Orchestrates all sub-agents using the agents-as-tools pattern
- **📡 Monitor Agent** — Real-time service health monitoring and metric collection
- **🔬 Analyst Agent** — Root cause analysis with incident history and embeddings
- **🔊 Voice Agent** — Text-to-speech alerts and voice-based status updates
- **📊 Dashboard Agent** — Incident CRUD, system state tracking, resolution metrics
- **💻 Interactive CLI** — Terminal interface with 6 built-in commands
- **⚡ Live Demo Mode** — Animated walkthrough showing agent coordination in action
- **🌙 Dark DevOps Theme** — Slate-950 background with emerald/cyan/amber accents

## Quick Start

### Frontend

```bash
cd .
npm install
npm run dev
# → http://localhost:3000
```

### Backend

```bash
cd backend
uv sync
uv run uvicorn novaops.main:app --reload
# → http://localhost:8000
```

### Environment Variables

```bash
# backend/.env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
```

## Project Structure

```
novaops/
├── app/                        # Next.js 15 frontend
│   ├── components/
│   │   ├── AgentTopology.tsx    # Agent network visualization
│   │   ├── MetricsPanel.tsx     # System metrics grid
│   │   ├── IncidentTimeline.tsx # Incident feed with severity
│   │   ├── CommandTerminal.tsx  # Interactive CLI terminal
│   │   ├── ActivityLog.tsx      # Real-time agent activity
│   │   └── StatusHeader.tsx     # System status + clock
│   ├── page.tsx                 # Main dashboard layout
│   └── layout.tsx               # Root layout
├── backend/
│   ├── novaops/
│   │   ├── agents/              # Strands agent definitions
│   │   ├── config.py            # Bedrock + agent configuration
│   │   └── models.py            # Pydantic data models
│   └── pyproject.toml           # Python dependencies (uv)
├── package.json                 # Node.js dependencies
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind v4 configuration
└── vercel.json                  # Vercel deployment config
```

## Judging Criteria

| Criteria | Weight |
|----------|--------|
| Technical Implementation | 60% |
| Enterprise/Community Impact | 20% |
| Creativity/Innovation | 20% |

## License

MIT

---

**#AmazonNova** · Built with ❤️ for the Amazon Nova AI Hackathon 2026
