"""Tests for NovaOps agents and tools."""

import pytest
from novaops.tools.infra import check_health, get_metrics


class TestCheckHealth:
    """Tests for the check_health tool."""

    def test_returns_dict(self):
        result = check_health(service="api")
        assert isinstance(result, dict)

    def test_contains_required_keys(self):
        result = check_health(service="database")
        assert "service" in result
        assert "status" in result
        assert "timestamp" in result
        assert "uptime_hours" in result

    def test_service_name_preserved(self):
        result = check_health(service="cache")
        assert result["service"] == "cache"

    def test_status_is_valid(self):
        result = check_health(service="queue")
        assert result["status"] in ("healthy", "degraded", "unhealthy")


class TestGetMetrics:
    """Tests for the get_metrics tool."""

    def test_returns_dict(self):
        result = get_metrics(service="api", metric_type="cpu")
        assert isinstance(result, dict)

    def test_contains_required_keys(self):
        result = get_metrics(service="api", metric_type="memory")
        assert "service" in result
        assert "metric_type" in result
        assert "value" in result
        assert "unit" in result
        assert "timestamp" in result

    def test_metric_type_preserved(self):
        result = get_metrics(service="api", metric_type="latency")
        assert result["metric_type"] == "latency"

    def test_cpu_unit_is_percent(self):
        result = get_metrics(service="api", metric_type="cpu")
        assert result["unit"] == "%"

    def test_latency_unit_is_ms(self):
        result = get_metrics(service="api", metric_type="latency")
        assert result["unit"] == "ms"

    def test_default_metric_type(self):
        result = get_metrics(service="api")
        assert result["metric_type"] == "cpu"


class TestVersion:
    """Test package metadata."""

    def test_version_exists(self):
        from novaops import __version__
        assert __version__ == "0.2.0"
