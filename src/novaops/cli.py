"""NovaOps CLI entry point — run with `uv run novaops run`."""

import sys


def main():
    """Main CLI entry point for NovaOps."""
    if len(sys.argv) < 2:
        print_help()
        return

    command = sys.argv[1]

    if command == "run":
        run_commander()
    elif command == "version":
        from novaops import __version__
        print(f"NovaOps v{__version__}")
    elif command == "health":
        run_health_check()
    elif command == "incident":
        run_create_incident()
    elif command == "analyze":
        run_analyze()
    elif command == "dashboard":
        run_dashboard()
    elif command == "voice":
        run_voice_alert()
    else:
        print(f"Unknown command: {command}")
        print_help()
        sys.exit(1)


def print_help():
    """Print CLI usage help."""
    print(
        """\
NovaOps — AI-powered DevOps command center

Usage:
  novaops run                              Start the Commander Agent interactive session
  novaops health                           Run a quick infrastructure health check
  novaops incident <title> [severity]      Create a new incident (severity: low/medium/high/critical)
  novaops analyze <query>                  Search incident history for similar incidents
  novaops dashboard                        Show current dashboard state
  novaops voice <message> [severity]       Broadcast a voice alert (severity: info/warning/critical)
  novaops version                          Show version

Examples:
  uv run novaops run
  uv run novaops health
  uv run novaops incident "API gateway timeout" high
  uv run novaops analyze "database replication lag"
  uv run novaops dashboard
  uv run novaops voice "Critical alert on API" critical
"""
    )


def run_commander():
    """Start an interactive session with the Commander Agent."""
    from novaops.agents.commander import commander_agent

    print("🚀 NovaOps Commander starting...")
    print("Type your commands (Ctrl+C to exit):\n")

    try:
        while True:
            user_input = input("novaops> ").strip()
            if not user_input:
                continue
            if user_input.lower() in ("exit", "quit"):
                print("👋 NovaOps Commander shutting down.")
                break
            response = commander_agent(user_input)
            print(f"\n{response}\n")
    except (KeyboardInterrupt, EOFError):
        print("\n👋 NovaOps Commander shutting down.")


def run_health_check():
    """Run a quick health check across all default services."""
    from novaops.tools.infra import check_health

    services = ["api", "database", "cache", "queue"]
    print("🔍 Running infrastructure health check...\n")

    for svc in services:
        result = check_health(service=svc)
        status_icon = "✅" if result["status"] == "healthy" else "⚠️" if result["status"] == "degraded" else "❌"
        print(f"  {status_icon} {result['service']:12s} — {result['status']:10s} (uptime: {result['uptime_hours']}h)")

    print("\nDone.")


def run_create_incident():
    """Create a new incident via dashboard tools."""
    from novaops.tools.dashboard import create_incident

    if len(sys.argv) < 3:
        print("Usage: novaops incident <title> [severity]")
        print("  severity: low, medium, high, critical (default: medium)")
        sys.exit(1)

    title = sys.argv[2]
    severity = sys.argv[3] if len(sys.argv) > 3 else "medium"

    print(f"📋 Creating incident: '{title}' (severity: {severity})\n")
    result = create_incident(title=title, severity=severity, description=f"Incident created via CLI: {title}")

    print(f"  ID:       {result['incident_id']}")
    print(f"  Title:    {result['title']}")
    print(f"  Severity: {result['severity']}")
    print(f"  Status:   {result['status']}")
    print(f"  Created:  {result['created_at']}")
    print("\nDone.")


def run_analyze():
    """Search incident history via analyst tools."""
    from novaops.tools.analysis import search_incidents

    if len(sys.argv) < 3:
        print("Usage: novaops analyze <query>")
        sys.exit(1)

    query = " ".join(sys.argv[2:])
    print(f"🔎 Searching incidents for: '{query}'\n")
    result = search_incidents(query=query)

    print(f"  Found {result['result_count']} similar incidents:\n")
    for r in result["results"]:
        print(f"  [{r['incident_id']}] {r['title']}")
        print(f"    Severity: {r['severity']} | Service: {r['service']} | Score: {r['similarity_score']}")
        print()

    print("Done.")


def run_dashboard():
    """Show current dashboard state."""
    from novaops.tools.dashboard import get_dashboard_data

    print("📊 NovaOps Dashboard\n")
    data = get_dashboard_data()

    print("  Services:")
    for svc in data["services"]:
        icon = "✅" if svc["status"] == "healthy" else "⚠️" if svc["status"] == "degraded" else "❌"
        print(f"    {icon} {svc['name']:12s} — {svc['status']:10s} (uptime: {svc['uptime']})")

    print(f"\n  Active Incidents: {data['incident_count']}")
    for inc in data["active_incidents"]:
        print(f"    [{inc['incident_id']}] {inc['title']} ({inc['severity']}) — {inc['status']}")

    print(f"\n  Agents:")
    for agent in data["agents"]:
        print(f"    🤖 {agent['name']:12s} — {agent['status']} ({agent['last_action']})")

    print(f"\n  System Health: {data['system_health']}")
    print("\nDone.")


def run_voice_alert():
    """Broadcast a voice alert."""
    from novaops.tools.voice import voice_alert

    if len(sys.argv) < 3:
        print("Usage: novaops voice <message> [severity]")
        print("  severity: info, warning, critical (default: info)")
        sys.exit(1)

    message = sys.argv[2]
    severity = sys.argv[3] if len(sys.argv) > 3 else "info"

    print(f"🔊 Broadcasting voice alert (severity: {severity})\n")
    result = voice_alert(message=message, severity=severity)

    print(f"  Message:    {result['message']}")
    print(f"  Severity:   {result['severity']}")
    print(f"  Channels:   {', '.join(result['channels'])}")
    print(f"  Status:     {result['broadcast_status']}")
    print(f"  Recipients: {result['recipients_count']}")
    print("\nDone.")


if __name__ == "__main__":
    main()
