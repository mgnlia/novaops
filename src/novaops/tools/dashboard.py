"""Dashboard tools — incident management and aggregated dashboard state."""

import random
import uuid
from datetime import datetime, timezone
from strands import tool

# In-memory incident store for dashboard operations
_active_incidents: list[dict] = []


@tool
def get_dashboard_data() -> dict:
    """Get aggregated dashboard state including service statuses, active incidents, and agent activity.

    Returns:
        A dictionary with the full dashboard state.
    """
    services = [
        {"name": "api", "status": random.choice(["healthy", "healthy", "degraded"]), "uptime": "99.95%"},
        {"name": "database", "status": random.choice(["healthy", "healthy", "healthy"]), "uptime": "99.99%"},
        {"name": "cache", "status": random.choice(["healthy", "healthy", "degraded"]), "uptime": "99.90%"},
        {"name": "queue", "status": random.choice(["healthy", "degraded", "unhealthy"]), "uptime": "99.80%"},
    ]

    agents = [
        {"name": "Commander", "status": "active", "last_action": "orchestrating"},
        {"name": "Monitor", "status": "active", "last_action": "health_check"},
        {"name": "Analyst", "status": "active", "last_action": "incident_search"},
        {"name": "Voice", "status": "active", "last_action": "listening"},
        {"name": "Dashboard", "status": "active", "last_action": "data_refresh"},
    ]

    return {
        "services": services,
        "active_incidents": _active_incidents.copy(),
        "incident_count": len(_active_incidents),
        "agents": agents,
        "system_health": "operational" if all(s["status"] == "healthy" for s in services) else "degraded",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@tool
def create_incident(title: str, severity: str, description: str) -> dict:
    """Create a new incident in the dashboard.

    Args:
        title: Short title for the incident.
        severity: Incident severity — one of 'low', 'medium', 'high', 'critical'.
        description: Detailed description of the incident.

    Returns:
        A dictionary with the created incident details.
    """
    valid_severities = ("low", "medium", "high", "critical")
    if severity not in valid_severities:
        severity = "medium"

    incident_id = f"INC-{uuid.uuid4().hex[:6].upper()}"
    incident = {
        "incident_id": incident_id,
        "title": title,
        "severity": severity,
        "description": description,
        "status": "open",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "assigned_to": None,
    }
    _active_incidents.append(incident)

    return incident


@tool
def update_incident_status(incident_id: str, status: str) -> dict:
    """Update the status of an existing incident.

    Args:
        incident_id: The incident ID to update.
        status: New status — one of 'open', 'investigating', 'mitigated', 'resolved', 'closed'.

    Returns:
        A dictionary with the updated incident details or an error message.
    """
    valid_statuses = ("open", "investigating", "mitigated", "resolved", "closed")
    if status not in valid_statuses:
        return {
            "incident_id": incident_id,
            "error": f"Invalid status '{status}'. Must be one of {valid_statuses}.",
        }

    for inc in _active_incidents:
        if inc["incident_id"] == incident_id:
            inc["status"] = status
            inc["updated_at"] = datetime.now(timezone.utc).isoformat()
            return {
                "incident_id": incident_id,
                "status": status,
                "message": f"Incident {incident_id} updated to '{status}'.",
                "updated_at": inc["updated_at"],
            }

    return {
        "incident_id": incident_id,
        "status": "not_found",
        "message": f"No incident found with ID '{incident_id}'.",
    }
