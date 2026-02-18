"""NovaOps agent definitions."""

from novaops.agents.monitor import monitor_agent
from novaops.agents.analyst import analyst_agent
from novaops.agents.voice import voice_agent
from novaops.agents.dashboard import dashboard_agent
from novaops.agents.commander import commander_agent

__all__ = [
    "commander_agent",
    "monitor_agent",
    "analyst_agent",
    "voice_agent",
    "dashboard_agent",
]
