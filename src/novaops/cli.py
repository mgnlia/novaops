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
  novaops run        Start the Commander Agent interactive session
  novaops health     Run a quick infrastructure health check
  novaops version    Show version

Examples:
  uv run novaops run
  uv run novaops health
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


if __name__ == "__main__":
    main()
