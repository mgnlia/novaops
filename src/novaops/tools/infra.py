"""Infrastructure monitoring tools for the Monitor Agent."""

import random
from datetime import datetime, timezone
from strands import tool


@tool
def check_health(service: str) -> dict:
    """Check the health status of a given infrastructure service.

    Args:
        service: The name of the service to check (e.g. 'api', 'database', 'cache', 'queue').

    Returns:
        A dictionary with service health details.
    """
    # Mock health check data
    statuses = ["healthy", "healthy", "healthy", "degraded", "unhealthy"]
    status = random.choice(statuses)
    return {
        "service": service,
        "status": status,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "uptime_hours": round(random.uniform(1.0, 720.0), 2),
        "last_incident": None if status == "healthy" else "High latency detected",
    }


@tool
def get_metrics(service: str, metric_type: str = "cpu") -> dict:
    """Retrieve performance metrics for a given infrastructure service.

    Args:
        service: The name of the service to query metrics for.
        metric_type: The type of metric to retrieve. One of 'cpu', 'memory', 'latency', 'throughput'.

    Returns:
        A dictionary containing the requested metrics.
    """
    # Mock metrics data
    metric_ranges = {
        "cpu": {"value": round(random.uniform(5.0, 95.0), 1), "unit": "%"},
        "memory": {"value": round(random.uniform(20.0, 90.0), 1), "unit": "%"},
        "latency": {"value": round(random.uniform(1.0, 500.0), 1), "unit": "ms"},
        "throughput": {"value": round(random.uniform(100.0, 10000.0), 1), "unit": "req/s"},
    }
    metric = metric_ranges.get(metric_type, metric_ranges["cpu"])
    return {
        "service": service,
        "metric_type": metric_type,
        "value": metric["value"],
        "unit": metric["unit"],
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "trend": random.choice(["stable", "increasing", "decreasing"]),
    }
