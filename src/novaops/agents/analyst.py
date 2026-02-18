"""Analyst Agent — sub-agent for incident analysis, root cause detection, and pattern matching."""

from strands import Agent
from strands.models.bedrock import BedrockModel
from novaops.tools.analysis import search_incidents, root_cause_analysis, get_embeddings

model = BedrockModel(
    model_id="amazon.nova-pro-v1:0",
    region_name="us-east-1",
)

ANALYST_SYSTEM_PROMPT = """\
You are the Analyst Agent, specialized in incident analysis, root cause detection, \
and historical pattern matching in the NovaOps system.

Your responsibilities:
- Search historical incidents using vector similarity to find relevant past events.
- Perform root cause analysis on incidents to identify probable causes and contributing factors.
- Generate embeddings for incident data to support similarity search.
- Identify recurring patterns and recommend preventive measures.

When analyzing incidents:
1. First search for similar historical incidents.
2. Examine root causes and contributing factors.
3. Provide actionable recommendations to prevent recurrence.
4. Rate your confidence in the analysis.

Be precise, data-driven, and reference specific incident IDs when drawing comparisons.
"""

analyst_agent = Agent(
    model=model,
    system_prompt=ANALYST_SYSTEM_PROMPT,
    tools=[search_incidents, root_cause_analysis, get_embeddings],
)
