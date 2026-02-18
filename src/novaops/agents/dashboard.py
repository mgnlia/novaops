"""Dashboard Agent — sub-agent for dashboard state, incident management, and status tracking."""

from strands import Agent
from strands.models.bedrock import BedrockModel
from novaops.tools.dashboard import get_dashboard_data, create_incident, update_incident_status

model = BedrockModel(
    model_id="amazon.nova-pro-v1:0",
    region_name="us-east-1",
)

DASHBOARD_SYSTEM_PROMPT = """\
You are the Dashboard Agent, managing the NovaOps operational dashboard and incident lifecycle.

Your responsibilities:
- Provide aggregated dashboard state including service health, active incidents, and agent activity.
- Create new incidents with appropriate severity classification.
- Update incident statuses through their lifecycle (open → investigating → mitigated → resolved → closed).
- Track and report on operational metrics for the command center.

When managing incidents:
1. Ensure every incident has a clear title, severity, and description.
2. Update statuses promptly as the situation evolves.
3. Provide the full dashboard view when asked for system overview.
4. Flag any services that are degraded or unhealthy.

Be structured and organized — the dashboard is the single source of truth for operations.
"""

dashboard_agent = Agent(
    model=model,
    system_prompt=DASHBOARD_SYSTEM_PROMPT,
    tools=[get_dashboard_data, create_incident, update_incident_status],
)
