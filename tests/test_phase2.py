"""Tests for NovaOps Phase 2 — Analyst, Voice, Dashboard agents and tools."""

import pytest
from novaops.tools.analysis import search_incidents, root_cause_analysis, get_embeddings
from novaops.tools.voice import text_to_speech, speech_to_text, voice_alert
from novaops.tools.dashboard import get_dashboard_data, create_incident, update_incident_status, _active_incidents


# ── Analyst Tools ────────────────────────────────────────────────────────────


class TestSearchIncidents:
    """Tests for the search_incidents tool."""

    def test_returns_dict(self):
        result = search_incidents(query="api timeout")
        assert isinstance(result, dict)

    def test_contains_required_keys(self):
        result = search_incidents(query="database lag")
        assert "query" in result
        assert "result_count" in result
        assert "results" in result
        assert "search_timestamp" in result

    def test_query_preserved(self):
        result = search_incidents(query="cache eviction")
        assert result["query"] == "cache eviction"

    def test_returns_top_k_results(self):
        result = search_incidents(query="timeout")
        assert result["result_count"] <= 3
        assert len(result["results"]) == result["result_count"]

    def test_result_entries_have_required_keys(self):
        result = search_incidents(query="replication")
        for entry in result["results"]:
            assert "incident_id" in entry
            assert "title" in entry
            assert "severity" in entry
            assert "service" in entry
            assert "similarity_score" in entry

    def test_similarity_scores_are_bounded(self):
        result = search_incidents(query="api")
        for entry in result["results"]:
            assert 0.0 <= entry["similarity_score"] <= 1.0


class TestRootCauseAnalysis:
    """Tests for the root_cause_analysis tool."""

    def test_returns_dict(self):
        result = root_cause_analysis(incident_id="INC-001")
        assert isinstance(result, dict)

    def test_known_incident_has_root_cause(self):
        result = root_cause_analysis(incident_id="INC-001")
        assert "root_cause" in result
        assert "recommendations" in result
        assert "contributing_factors" in result
        assert "confidence" in result

    def test_incident_id_preserved(self):
        result = root_cause_analysis(incident_id="INC-002")
        assert result["incident_id"] == "INC-002"

    def test_unknown_incident_returns_not_found(self):
        result = root_cause_analysis(incident_id="INC-999")
        assert result["status"] == "not_found"

    def test_confidence_is_bounded(self):
        result = root_cause_analysis(incident_id="INC-003")
        assert 0.0 <= result["confidence"] <= 1.0


class TestGetEmbeddings:
    """Tests for the get_embeddings tool."""

    def test_returns_dict(self):
        result = get_embeddings(text="test embedding")
        assert isinstance(result, dict)

    def test_contains_required_keys(self):
        result = get_embeddings(text="hello world")
        assert "text" in result
        assert "model" in result
        assert "dimension" in result
        assert "vector" in result

    def test_vector_has_correct_dimension(self):
        result = get_embeddings(text="sample text")
        assert len(result["vector"]) == result["dimension"]
        assert result["dimension"] == 256

    def test_deterministic_for_same_input(self):
        r1 = get_embeddings(text="deterministic test")
        r2 = get_embeddings(text="deterministic test")
        assert r1["vector"] == r2["vector"]

    def test_different_input_different_vector(self):
        r1 = get_embeddings(text="hello")
        r2 = get_embeddings(text="goodbye")
        assert r1["vector"] != r2["vector"]

    def test_model_is_nova_embed(self):
        result = get_embeddings(text="model check")
        assert result["model"] == "amazon.nova-embed-v1"


# ── Voice Tools ──────────────────────────────────────────────────────────────


class TestTextToSpeech:
    """Tests for the text_to_speech tool."""

    def test_returns_dict(self):
        result = text_to_speech(text="Hello operator")
        assert isinstance(result, dict)

    def test_contains_required_keys(self):
        result = text_to_speech(text="System status normal")
        assert "audio_ref" in result
        assert "format" in result
        assert "duration_seconds" in result
        assert "status" in result

    def test_status_is_synthesized(self):
        result = text_to_speech(text="Alert message")
        assert result["status"] == "synthesized"

    def test_duration_scales_with_text(self):
        short = text_to_speech(text="Hi")
        long = text_to_speech(text="This is a much longer sentence that should take more time to speak aloud to the operations team")
        assert long["duration_seconds"] > short["duration_seconds"]


class TestSpeechToText:
    """Tests for the speech_to_text tool."""

    def test_returns_dict(self):
        result = speech_to_text(audio_ref="audio-abc123")
        assert isinstance(result, dict)

    def test_contains_required_keys(self):
        result = speech_to_text(audio_ref="audio-xyz")
        assert "audio_ref" in result
        assert "transcription" in result
        assert "confidence" in result
        assert "language" in result
        assert "status" in result

    def test_audio_ref_preserved(self):
        result = speech_to_text(audio_ref="audio-test-ref")
        assert result["audio_ref"] == "audio-test-ref"

    def test_status_is_transcribed(self):
        result = speech_to_text(audio_ref="audio-001")
        assert result["status"] == "transcribed"

    def test_confidence_is_bounded(self):
        result = speech_to_text(audio_ref="audio-002")
        assert 0.0 <= result["confidence"] <= 1.0


class TestVoiceAlert:
    """Tests for the voice_alert tool."""

    def test_returns_dict(self):
        result = voice_alert(message="Test alert", severity="info")
        assert isinstance(result, dict)

    def test_contains_required_keys(self):
        result = voice_alert(message="Alert", severity="warning")
        assert "message" in result
        assert "severity" in result
        assert "channels" in result
        assert "broadcast_status" in result
        assert "recipients_count" in result

    def test_severity_preserved(self):
        result = voice_alert(message="Critical issue", severity="critical")
        assert result["severity"] == "critical"

    def test_critical_has_most_channels(self):
        info = voice_alert(message="Info", severity="info")
        critical = voice_alert(message="Critical", severity="critical")
        assert len(critical["channels"]) >= len(info["channels"])

    def test_broadcast_status_delivered(self):
        result = voice_alert(message="Test", severity="info")
        assert result["broadcast_status"] == "delivered"

    def test_invalid_severity_defaults_to_info(self):
        result = voice_alert(message="Test", severity="banana")
        assert result["severity"] == "info"


# ── Dashboard Tools ──────────────────────────────────────────────────────────


class TestGetDashboardData:
    """Tests for the get_dashboard_data tool."""

    def test_returns_dict(self):
        result = get_dashboard_data()
        assert isinstance(result, dict)

    def test_contains_required_keys(self):
        result = get_dashboard_data()
        assert "services" in result
        assert "active_incidents" in result
        assert "incident_count" in result
        assert "agents" in result
        assert "system_health" in result
        assert "timestamp" in result

    def test_services_list_not_empty(self):
        result = get_dashboard_data()
        assert len(result["services"]) > 0

    def test_agents_list_has_all_agents(self):
        result = get_dashboard_data()
        agent_names = [a["name"] for a in result["agents"]]
        assert "Commander" in agent_names
        assert "Monitor" in agent_names
        assert "Analyst" in agent_names
        assert "Voice" in agent_names
        assert "Dashboard" in agent_names


class TestCreateIncident:
    """Tests for the create_incident tool."""

    def setup_method(self):
        """Clear incident store before each test."""
        _active_incidents.clear()

    def test_returns_dict(self):
        result = create_incident(title="Test", severity="low", description="A test incident")
        assert isinstance(result, dict)

    def test_contains_required_keys(self):
        result = create_incident(title="Test", severity="high", description="Desc")
        assert "incident_id" in result
        assert "title" in result
        assert "severity" in result
        assert "description" in result
        assert "status" in result
        assert "created_at" in result

    def test_title_preserved(self):
        result = create_incident(title="API down", severity="critical", description="API is down")
        assert result["title"] == "API down"

    def test_status_is_open(self):
        result = create_incident(title="New", severity="medium", description="New incident")
        assert result["status"] == "open"

    def test_incident_added_to_store(self):
        create_incident(title="Stored", severity="low", description="Should be stored")
        assert len(_active_incidents) == 1

    def test_invalid_severity_defaults_to_medium(self):
        result = create_incident(title="Test", severity="banana", description="Bad severity")
        assert result["severity"] == "medium"


class TestUpdateIncidentStatus:
    """Tests for the update_incident_status tool."""

    def setup_method(self):
        """Clear and seed incident store."""
        _active_incidents.clear()

    def test_update_existing_incident(self):
        inc = create_incident(title="Updatable", severity="high", description="Will update")
        result = update_incident_status(incident_id=inc["incident_id"], status="investigating")
        assert result["status"] == "investigating"

    def test_not_found_for_missing_incident(self):
        result = update_incident_status(incident_id="INC-MISSING", status="resolved")
        assert result["status"] == "not_found"

    def test_invalid_status_returns_error(self):
        inc = create_incident(title="Bad status", severity="low", description="Test")
        result = update_incident_status(incident_id=inc["incident_id"], status="banana")
        assert "error" in result


# ── Commander Integration ────────────────────────────────────────────────────


class TestCommanderIntegration:
    """Test that Commander correctly wires all sub-agents."""

    def test_commander_has_four_tools(self):
        from novaops.agents.commander import commander_agent
        # Commander should have 4 sub-agents as tools
        assert len(commander_agent.tools) == 4

    def test_commander_imports_all_agents(self):
        from novaops.agents.commander import commander_agent
        from novaops.agents.monitor import monitor_agent
        from novaops.agents.analyst import analyst_agent
        from novaops.agents.voice import voice_agent
        from novaops.agents.dashboard import dashboard_agent
        tools = commander_agent.tools
        # Verify all agents are present (they may be wrapped, so check count)
        assert len(tools) == 4


# ── Package-level imports ────────────────────────────────────────────────────


class TestPackageImports:
    """Test that package-level imports work correctly."""

    def test_agents_init_exports(self):
        from novaops.agents import commander_agent, monitor_agent, analyst_agent, voice_agent, dashboard_agent
        assert commander_agent is not None
        assert monitor_agent is not None
        assert analyst_agent is not None
        assert voice_agent is not None
        assert dashboard_agent is not None

    def test_tools_init_exports(self):
        from novaops.tools import (
            check_health, get_metrics,
            search_incidents, root_cause_analysis, get_embeddings,
            text_to_speech, speech_to_text, voice_alert,
            get_dashboard_data, create_incident, update_incident_status,
        )
        assert all(callable(f) for f in [
            check_health, get_metrics,
            search_incidents, root_cause_analysis, get_embeddings,
            text_to_speech, speech_to_text, voice_alert,
            get_dashboard_data, create_incident, update_incident_status,
        ])
