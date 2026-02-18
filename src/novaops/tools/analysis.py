"""Analyst tools — incident search, root cause analysis, and embeddings."""

import random
import hashlib
from datetime import datetime, timezone
from strands import tool

# Mock incident database for FAISS-style vector search
_INCIDENT_DB = [
    {
        "id": "INC-001",
        "title": "API gateway timeout spike",
        "severity": "high",
        "service": "api",
        "description": "API gateway experienced 5x increase in P99 latency, causing cascading timeouts.",
        "root_cause": "Connection pool exhaustion due to slow downstream database queries.",
        "resolved": True,
        "timestamp": "2026-02-10T14:30:00Z",
    },
    {
        "id": "INC-002",
        "title": "Database replication lag",
        "severity": "critical",
        "service": "database",
        "description": "Primary-replica replication lag exceeded 30 seconds, risking stale reads.",
        "root_cause": "Large batch insert job saturated I/O bandwidth on the primary node.",
        "resolved": True,
        "timestamp": "2026-02-08T09:15:00Z",
    },
    {
        "id": "INC-003",
        "title": "Cache eviction storm",
        "severity": "medium",
        "service": "cache",
        "description": "Redis cache hit ratio dropped to 40% after a deployment cleared warm caches.",
        "root_cause": "Deployment script flushed all cache keys instead of performing rolling invalidation.",
        "resolved": True,
        "timestamp": "2026-02-05T18:45:00Z",
    },
    {
        "id": "INC-004",
        "title": "Queue consumer backlog",
        "severity": "high",
        "service": "queue",
        "description": "Message queue backlog grew to 500K messages, processing delay exceeded 10 minutes.",
        "root_cause": "Consumer pods were OOMKilled due to memory leak in message deserialization.",
        "resolved": True,
        "timestamp": "2026-02-01T22:00:00Z",
    },
    {
        "id": "INC-005",
        "title": "SSL certificate expiry",
        "severity": "critical",
        "service": "api",
        "description": "TLS certificate for api.example.com expired, causing 100% request failures.",
        "root_cause": "Certificate auto-renewal cron job was disabled during maintenance window.",
        "resolved": True,
        "timestamp": "2026-01-28T06:00:00Z",
    },
]


@tool
def search_incidents(query: str) -> dict:
    """Search incident history using mock FAISS vector similarity search.

    Simulates embedding the query and finding the top-k most similar incidents
    from the historical incident database.

    Args:
        query: Natural language search query describing the incident or symptoms.

    Returns:
        A dictionary with the search query, result count, and matching incidents.
    """
    query_lower = query.lower()
    scored = []
    for inc in _INCIDENT_DB:
        score = 0.0
        text = f"{inc['title']} {inc['description']} {inc['service']}".lower()
        for word in query_lower.split():
            if word in text:
                score += 0.15
        # Add base similarity so results always come back
        score = min(score + random.uniform(0.3, 0.6), 1.0)
        scored.append((round(score, 3), inc))

    scored.sort(key=lambda x: x[0], reverse=True)
    top_k = scored[:3]

    return {
        "query": query,
        "result_count": len(top_k),
        "results": [
            {
                "incident_id": inc["id"],
                "title": inc["title"],
                "severity": inc["severity"],
                "service": inc["service"],
                "similarity_score": score,
                "timestamp": inc["timestamp"],
            }
            for score, inc in top_k
        ],
        "search_timestamp": datetime.now(timezone.utc).isoformat(),
    }


@tool
def root_cause_analysis(incident_id: str) -> dict:
    """Analyze an incident and return probable root causes.

    Args:
        incident_id: The incident ID to analyze (e.g. 'INC-001').

    Returns:
        A dictionary with the analysis results including probable root causes.
    """
    incident = None
    for inc in _INCIDENT_DB:
        if inc["id"] == incident_id:
            incident = inc
            break

    if incident is None:
        return {
            "incident_id": incident_id,
            "status": "not_found",
            "message": f"No incident found with ID '{incident_id}'.",
        }

    return {
        "incident_id": incident_id,
        "title": incident["title"],
        "severity": incident["severity"],
        "service": incident["service"],
        "root_cause": incident["root_cause"],
        "contributing_factors": [
            "Insufficient monitoring alerting thresholds",
            "Missing automated remediation runbook",
            f"Service '{incident['service']}' lacks redundancy in failure path",
        ],
        "recommendations": [
            "Add automated alerting for early detection",
            "Implement circuit breaker pattern",
            "Create runbook for similar incidents",
        ],
        "confidence": round(random.uniform(0.75, 0.98), 2),
        "analysis_timestamp": datetime.now(timezone.utc).isoformat(),
    }


@tool
def get_embeddings(text: str) -> dict:
    """Generate mock embeddings for the given text.

    Simulates Amazon Nova Embeddings API. Returns a deterministic fake vector
    based on the text hash for consistency.

    Args:
        text: The text to generate embeddings for.

    Returns:
        A dictionary with the embedding vector and metadata.
    """
    # Generate a deterministic pseudo-random vector from text hash
    text_hash = hashlib.sha256(text.encode()).hexdigest()
    random.seed(text_hash)
    dimension = 256
    vector = [round(random.uniform(-1.0, 1.0), 6) for _ in range(dimension)]
    random.seed()  # Reset seed

    return {
        "text": text[:100] + ("..." if len(text) > 100 else ""),
        "model": "amazon.nova-embed-v1",
        "dimension": dimension,
        "vector": vector,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
