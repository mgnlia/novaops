"""Commander Agent — top-level DevOps orchestrator using agents-as-tools pattern."""

from strands import Agent
from strands.models.bedrock import BedrockModel
from novaops.agents.monitor import monitor_agent

model = BedrockModel(
    model_id="amazon.nova-pro-v1:0",
    region_name="us-east-1",
)

COMMANDER_SYSTEM_PROMPT = """\
You are the NovaOps Commander, a DevOps command center orchestrator.

You coordinate a team of specialized sub-agents to manage infrastructure operations:
- **Monitor Agent**: Checks service health and retrieves performance metrics.

Your responsibilities:
1. Interpret user requests about infrastructure status, deployments, and operations.
2. Delegate tasks to the appropriate sub-agent using the agents-as-tools pattern.
3. Synthesize responses from sub-agents into clear, actionable summaries.
4. Escalate critical issues and recommend remediation steps.

When a user asks about service health or metrics, delegate to the Monitor Agent.
Always provide a high-level summary after receiving sub-agent results.
"""

commander_agent = Agent(
    model=model,
    system_prompt=COMMANDER_SYSTEM_PROMPT,
    tools=[monitor_agent],
)
