"""Voice tools — text-to-speech, speech-to-text, and voice alerts."""

import hashlib
import random
from datetime import datetime, timezone
from strands import tool


@tool
def text_to_speech(text: str) -> dict:
    """Convert text to speech using mock TTS (simulates Amazon Nova Sonic integration).

    Args:
        text: The text to convert to speech audio.

    Returns:
        A dictionary with audio metadata including format, duration, and reference ID.
    """
    text_hash = hashlib.md5(text.encode()).hexdigest()[:12]
    word_count = len(text.split())
    # Approximate duration: ~150 words per minute
    duration_seconds = round(max(word_count / 2.5, 0.5), 2)

    return {
        "text": text[:200] + ("..." if len(text) > 200 else ""),
        "audio_ref": f"audio-{text_hash}",
        "format": "pcm_16000",
        "sample_rate": 16000,
        "duration_seconds": duration_seconds,
        "model": "amazon.nova-sonic-v1:0",
        "status": "synthesized",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@tool
def speech_to_text(audio_ref: str) -> dict:
    """Transcribe speech audio to text using mock STT (simulates Amazon Nova Sonic integration).

    Args:
        audio_ref: Reference ID or path to the audio to transcribe.

    Returns:
        A dictionary with the transcribed text and metadata.
    """
    # Mock transcriptions based on audio reference patterns
    mock_transcriptions = {
        "status": "Check the status of all services",
        "incident": "Create a new incident for the API gateway",
        "health": "Run a health check on the database",
        "deploy": "Deploy the latest version to production",
        "alert": "What are the current active alerts",
    }

    # Pick a transcription based on audio_ref content or default
    transcription = "Check the current system status and report any issues"
    for keyword, text in mock_transcriptions.items():
        if keyword in audio_ref.lower():
            transcription = text
            break

    return {
        "audio_ref": audio_ref,
        "transcription": transcription,
        "confidence": round(random.uniform(0.85, 0.99), 3),
        "language": "en-US",
        "model": "amazon.nova-sonic-v1:0",
        "duration_seconds": round(random.uniform(1.0, 10.0), 2),
        "status": "transcribed",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@tool
def voice_alert(message: str, severity: str) -> dict:
    """Broadcast a voice alert to the operations team.

    Args:
        message: The alert message to broadcast.
        severity: Alert severity level — one of 'info', 'warning', 'critical'.

    Returns:
        A dictionary with the alert broadcast status and metadata.
    """
    valid_severities = ("info", "warning", "critical")
    if severity not in valid_severities:
        severity = "info"

    channels = {
        "info": ["ops-general"],
        "warning": ["ops-general", "ops-oncall"],
        "critical": ["ops-general", "ops-oncall", "ops-escalation"],
    }

    return {
        "message": message,
        "severity": severity,
        "channels": channels[severity],
        "broadcast_status": "delivered",
        "recipients_count": len(channels[severity]) * random.randint(2, 8),
        "audio_ref": f"alert-{hashlib.md5(message.encode()).hexdigest()[:8]}",
        "model": "amazon.nova-sonic-v1:0",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
