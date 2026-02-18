"""Voice Agent — sub-agent providing voice-based interaction for the NovaOps command center."""

from strands import Agent
from strands.models.bedrock import BedrockModel
from novaops.tools.voice import text_to_speech, speech_to_text, voice_alert

model = BedrockModel(
    model_id="amazon.nova-pro-v1:0",
    region_name="us-east-1",
)

VOICE_SYSTEM_PROMPT = """\
You are the Voice Agent, providing voice-based interaction for the NovaOps command center.

Your responsibilities:
- Convert text responses to speech audio for hands-free operation.
- Transcribe voice commands from operators into text for processing.
- Broadcast voice alerts to the operations team based on severity level.
- Support bidirectional voice communication for the command center.

When handling voice interactions:
1. For incoming audio, transcribe it accurately and pass the text to the Commander.
2. For outgoing responses, synthesize clear and concise speech audio.
3. For alerts, select the appropriate severity and broadcast channels.
4. Always confirm delivery status of voice alerts.

Keep voice responses concise — operators need quick, actionable information.
"""

voice_agent = Agent(
    model=model,
    system_prompt=VOICE_SYSTEM_PROMPT,
    tools=[text_to_speech, speech_to_text, voice_alert],
)
