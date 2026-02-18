"""Monitor Agent — sub-agent responsible for infrastructure health checks and metrics."""

from strands import Agent
from strands.models.bedrock import BedrockModel
from novaops.tools.infra import check_health, get_metrics

model = BedrockModel(
    model_id="amazon.nova-pro-v1:0",
    region_name="us-east-1",
)

MONITOR_SYSTEM_PROMPT = """\
You are the Monitor Agent, a specialized infrastructure monitoring sub-agent in the NovaOps system.

Your responsibilities:
- Check the health status of infrastructure services when asked.
- Retrieve and report performance metrics (CPU, memory, latency, throughput).
- Summarize findings clearly and flag any services that are degraded or unhealthy.
- Provide actionable recommendations when issues are detected.

Always be concise and structured in your responses. Use bullet points for multi-service reports.
"""

monitor_agent = Agent(
    model=model,
    system_prompt=MONITOR_SYSTEM_PROMPT,
    tools=[check_health, get_metrics],
)
