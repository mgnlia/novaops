# NovaOps 🚀

AI-powered DevOps command center using multi-agent orchestration with [Strands Agents](https://github.com/strands-agents/sdk-python) and Amazon Bedrock Nova.

## Architecture

```
┌─────────────────────────────────┐
│       Commander Agent           │  ← Top-level orchestrator
│   (agents-as-tools pattern)     │
└──────────────┬──────────────────┘
               │
       ┌───────▼───────┐
       │ Monitor Agent  │  ← Infrastructure health & metrics
       │  check_health  │
       │  get_metrics   │
       └────────────────┘
```

- **Commander Agent** — Interprets user requests, delegates to sub-agents, synthesizes results
- **Monitor Agent** — Checks service health and retrieves performance metrics
- **Tools** — `check_health` and `get_metrics` (mock data, ready for real integrations)

## Quick Start

```bash
# Install dependencies
uv sync

# Run the interactive Commander
uv run novaops run

# Quick health check
uv run novaops health

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
├── cli.py                  # CLI entry point
├── agents/
│   ├── commander.py        # Commander Agent (orchestrator)
│   └── monitor.py          # Monitor Agent (sub-agent)
└── tools/
    └── infra.py            # check_health, get_metrics tools
tests/
    └── test_commander.py   # Unit tests
frontend/                   # Next.js dashboard (Phase 3)
```

## Requirements

- Python 3.11+
- AWS credentials configured (for Bedrock access)
- [uv](https://docs.astral.sh/uv/) package manager

## License

MIT
