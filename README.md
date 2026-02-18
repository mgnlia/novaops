# NovaOps 🚀

AI-powered DevOps command center using multi-agent orchestration with [Strands Agents](https://github.com/strands-agents/sdk-python) and Amazon Bedrock Nova.

Built for the **Amazon Nova AI Hackathon**.

## Architecture

```
┌──────────────────────────────────────────────────┐
│              Commander Agent                      │  ← Top-level orchestrator
│          (agents-as-tools pattern)                │
└──────┬──────────┬──────────┬──────────┬──────────┘
       │          │          │          │
┌──────▼──┐ ┌────▼─────┐ ┌──▼────┐ ┌───▼──────┐
│ Monitor  │ │ Analyst  │ │ Voice │ │Dashboard │
│  Agent   │ │  Agent   │ │ Agent │ │  Agent   │
├──────────┤ ├──────────┤ ├───────┤ ├──────────┤
│check_    │ │search_   │ │tts    │ │get_dash  │
│  health  │ │incidents │ │stt    │ │create_   │
│get_      │ │root_cause│ │voice_ │ │  incident│
│  metrics │ │embeddings│ │ alert │ │update_   │
└──────────┘ └──────────┘ └───────┘ │  status  │
                                     └──────────┘
```

### Agents

- **Commander Agent** — Interprets user requests, delegates to sub-agents, synthesizes results
- **Monitor Agent** — Checks service health and retrieves performance metrics
- **Analyst Agent** — Incident analysis, root cause detection, historical pattern matching via FAISS vector search
- **Voice Agent** — Voice-based interaction: TTS, STT, and voice alert broadcasts (Nova Sonic integration)
- **Dashboard Agent** — Operational dashboard state, incident lifecycle management

### Tools

| Tool | Agent | Description |
|------|-------|-------------|
| `check_health` | Monitor | Check infrastructure service health |
| `get_metrics` | Monitor | Retrieve CPU, memory, latency, throughput metrics |
| `search_incidents` | Analyst | Mock FAISS vector search over incident history |
| `root_cause_analysis` | Analyst | Analyze incidents for probable root causes |
| `get_embeddings` | Analyst | Generate mock embeddings (Nova Embed) |
| `text_to_speech` | Voice | Convert text to speech audio (Nova Sonic) |
| `speech_to_text` | Voice | Transcribe speech audio to text |
| `voice_alert` | Voice | Broadcast voice alerts by severity |
| `get_dashboard_data` | Dashboard | Aggregated system state |
| `create_incident` | Dashboard | Create new incidents |
| `update_incident_status` | Dashboard | Update incident lifecycle status |

## Quick Start

```bash
# Install dependencies
uv sync

# Run the interactive Commander
uv run novaops run

# Quick health check
uv run novaops health

# Create an incident
uv run novaops incident "API gateway timeout" high

# Search incident history
uv run novaops analyze "database replication lag"

# View dashboard
uv run novaops dashboard

# Broadcast voice alert
uv run novaops voice "Critical alert on API" critical

# Show version
uv run novaops version
```

## Development

```bash
# Run tests
uv run pytest -v

# Install in dev mode
uv sync
```

## Project Structure

```
src/novaops/
├── __init__.py
├── cli.py                  # CLI entry point (7 commands)
├── agents/
│   ├── __init__.py
│   ├── commander.py        # Commander Agent (orchestrator)
│   ├── monitor.py          # Monitor Agent (health/metrics)
│   ├── analyst.py          # Analyst Agent (incidents/RCA)
│   ├── voice.py            # Voice Agent (TTS/STT/alerts)
│   └── dashboard.py        # Dashboard Agent (state/incidents)
└── tools/
    ├── __init__.py
    ├── infra.py            # check_health, get_metrics
    ├── analysis.py         # search_incidents, root_cause_analysis, get_embeddings
    ├── voice.py            # text_to_speech, speech_to_text, voice_alert
    └── dashboard.py        # get_dashboard_data, create_incident, update_incident_status
tests/
├── test_commander.py       # Phase 1 tests (11 tests)
└── test_phase2.py          # Phase 2 tests (40+ tests)
```

## Requirements

- Python 3.11+
- AWS credentials configured (for Bedrock access)
- [uv](https://docs.astral.sh/uv/) package manager

## Tech Stack

- **[Strands Agents SDK](https://github.com/strands-agents/sdk-python)** — Multi-agent orchestration with agents-as-tools pattern
- **Amazon Bedrock** — Nova Pro v1 (LLM), Nova Embed v1 (embeddings), Nova Sonic (voice)
- **Python 3.11+** with **uv** package manager

## License

MIT
