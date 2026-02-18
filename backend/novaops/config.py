"""Configuration for NovaOps agents and services."""

import os
from dataclasses import dataclass, field
from dotenv import load_dotenv

load_dotenv()


@dataclass
class NovaOpsConfig:
    """Configuration for the NovaOps system."""

    # AWS / Bedrock settings
    aws_region: str = field(default_factory=lambda: os.getenv("AWS_REGION", "us-east-1"))
    bedrock_model_id: str = field(
        default_factory=lambda: os.getenv(
            "BEDROCK_MODEL_ID", "us.amazon.nova-pro-v1:0"
        )
    )
    bedrock_lite_model_id: str = field(
        default_factory=lambda: os.getenv(
            "BEDROCK_LITE_MODEL_ID", "us.amazon.nova-lite-v1:0"
        )
    )

    # Server settings
    host: str = field(default_factory=lambda: os.getenv("HOST", "0.0.0.0"))
    port: int = field(default_factory=lambda: int(os.getenv("PORT", "8000")))
    cors_origins: list[str] = field(
        default_factory=lambda: os.getenv(
            "CORS_ORIGINS", "http://localhost:3000,https://*.vercel.app"
        ).split(",")
    )

    # Agent settings
    max_agent_turns: int = 10
    agent_timeout: int = 120

    # Demo mode (uses mock data instead of real AWS calls)
    demo_mode: bool = field(
        default_factory=lambda: os.getenv("DEMO_MODE", "true").lower() == "true"
    )


config = NovaOpsConfig()
