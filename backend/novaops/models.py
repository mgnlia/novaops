"""Pydantic models for NovaOps API."""

from __future__ import annotations

import uuid
from datetime import datetime
from enum import Enum
from typing import Any

from pydantic import BaseModel, Field


# --- Enums ---

class AgentRole(str, Enum):
    COMMANDER = "commander"
    MONITOR = "monitor"
    INCIDENT = "incident"
    DEPLOY = "deploy"
    SECURITY = "security"
    PERFORMANCE = "performance"


class Severity(str, Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    INFO = "info"


class ServiceStatus(str, Enum):
    HEALTHY = "healthy"
    DEGRADED = "degraded"
    DOWN = "down"
    UNKNOWN = "unknown"


class IncidentStatus(str, Enum):
    OPEN = "open"
    INVESTIGATING = "investigating"
    MITIGATING = "mitigating"
    RESOLVED = "resolved"


class DeploymentStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    SUCCESS = "success"
    FAILED = "failed"
    ROLLED_BACK = "rolled_back"


# --- Infrastructure Models ---

class ServiceHealth(BaseModel):
    """Health status of a monitored service."""
    service_id: str = Field(default_factory=lambda: str(uuid.uuid4())[:8])
    name: str
    status: ServiceStatus = ServiceStatus.HEALTHY
    uptime_pct: float = 99.99
    response_time_ms: float = 45.0
    error_rate_pct: float = 0.01
    cpu_usage_pct: float = 35.0
    memory_usage_pct: float = 52.0
    region: str = "us-east-1"
    last_check: datetime = Field(default_factory=datetime.utcnow)


class Metric(BaseModel):
    """A time-series metric data point."""
    name: str
    value: float
    unit: str = ""
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    tags: dict[str, str] = {}


class MetricSeries(BaseModel):
    """A series of metric data points."""
    name: str
    service: str
    data_points: list[Metric] = []
    trend: str = "stable"  # rising, falling, stable, volatile


# --- Incident Models ---

class Incident(BaseModel):
    """An operational incident."""
    id: str = Field(default_factory=lambda: f"INC-{uuid.uuid4().hex[:6].upper()}")
    title: str
    description: str = ""
    severity: Severity = Severity.MEDIUM
    status: IncidentStatus = IncidentStatus.OPEN
    affected_services: list[str] = []
    root_cause: str | None = None
    remediation: str | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    resolved_at: datetime | None = None
    ai_analysis: str | None = None


# --- Deployment Models ---

class Deployment(BaseModel):
    """A deployment record."""
    id: str = Field(default_factory=lambda: f"DEP-{uuid.uuid4().hex[:6].upper()}")
    service: str
    version: str
    environment: str = "production"
    status: DeploymentStatus = DeploymentStatus.PENDING
    started_at: datetime = Field(default_factory=datetime.utcnow)
    completed_at: datetime | None = None
    commit_sha: str = ""
    release_notes: str = ""
    ai_risk_assessment: str | None = None


# --- Security Models ---

class SecurityFinding(BaseModel):
    """A security vulnerability or finding."""
    id: str = Field(default_factory=lambda: f"SEC-{uuid.uuid4().hex[:6].upper()}")
    title: str
    severity: Severity = Severity.MEDIUM
    category: str = "vulnerability"
    affected_resource: str = ""
    description: str = ""
    recommendation: str = ""
    cve_id: str | None = None
    detected_at: datetime = Field(default_factory=datetime.utcnow)
    resolved: bool = False


# --- Agent Models ---

class AgentMessage(BaseModel):
    """A message in an agent conversation."""
    role: str  # user, assistant, system
    content: str
    agent: AgentRole | None = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    metadata: dict[str, Any] = {}


class AgentResponse(BaseModel):
    """Response from the Commander agent."""
    message: str
    agent_used: AgentRole
    sub_agents_invoked: list[AgentRole] = []
    confidence: float = 0.0
    actions_taken: list[str] = []
    recommendations: list[str] = []
    metadata: dict[str, Any] = {}


class CommandRequest(BaseModel):
    """User command to the Commander agent."""
    message: str
    context: dict[str, Any] = {}
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))


class CommandResponse(BaseModel):
    """Response from the Commander agent to the user."""
    session_id: str
    response: AgentResponse
    conversation: list[AgentMessage] = []
    timestamp: datetime = Field(default_factory=datetime.utcnow)


# --- Dashboard Models ---

class DashboardOverview(BaseModel):
    """High-level dashboard overview data."""
    total_services: int = 0
    healthy_services: int = 0
    degraded_services: int = 0
    down_services: int = 0
    open_incidents: int = 0
    active_deployments: int = 0
    security_findings: int = 0
    avg_response_time_ms: float = 0.0
    overall_health_pct: float = 0.0
    services: list[ServiceHealth] = []
    recent_incidents: list[Incident] = []
    recent_deployments: list[Deployment] = []
    critical_findings: list[SecurityFinding] = []
