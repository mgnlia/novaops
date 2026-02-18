"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  DemoEvent,
  DemoPhase,
  DemoScenario,
  scenarios,
  createDemoEvents,
} from "./demo-engine";

export interface DemoState {
  isRunning: boolean;
  isPaused: boolean;
  phase: DemoPhase;
  events: DemoEvent[];
  currentEventIndex: number;
  activeAgent: string | null;
  activeConnections: string[];
  scenario: DemoScenario | null;
  progress: number;
}

const initialState: DemoState = {
  isRunning: false,
  isPaused: false,
  phase: "idle",
  events: [],
  currentEventIndex: -1,
  activeAgent: null,
  activeConnections: [],
  scenario: null,
  progress: 0,
};

export function useDemo() {
  const [state, setState] = useState<DemoState>(initialState);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const allEventsRef = useRef<DemoEvent[]>([]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const advanceEvent = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentEventIndex + 1;
      const allEvents = allEventsRef.current;

      if (nextIndex >= allEvents.length) {
        return {
          ...prev,
          isRunning: false,
          phase: "complete",
          activeAgent: null,
          activeConnections: [],
          progress: 100,
        };
      }

      const event = allEvents[nextIndex];
      const connections: string[] = [];

      // Show connection from Commander to the active agent
      if (event.agent !== "Commander") {
        connections.push(`Commander-${event.agent}`);
      }
      // If it's a delegation, also show return path
      if (event.type === "delegation") {
        connections.push(`Commander-${event.agent}`);
      }

      return {
        ...prev,
        currentEventIndex: nextIndex,
        events: [...prev.events, event],
        phase: event.phase,
        activeAgent: event.agent,
        activeConnections: connections,
        progress: Math.round(((nextIndex + 1) / allEvents.length) * 100),
      };
    });
  }, []);

  // Schedule next event
  useEffect(() => {
    if (state.isRunning && !state.isPaused && state.currentEventIndex < allEventsRef.current.length - 1) {
      timerRef.current = setTimeout(advanceEvent, 2200);
    }
    return () => clearTimer();
  }, [state.isRunning, state.isPaused, state.currentEventIndex, advanceEvent, clearTimer]);

  const startDemo = useCallback(
    (scenarioIndex: number = 0) => {
      clearTimer();
      const scenario = scenarios[scenarioIndex];
      const events = createDemoEvents(scenario);
      allEventsRef.current = events;

      setState({
        isRunning: true,
        isPaused: false,
        phase: "detection",
        events: [],
        currentEventIndex: -1,
        activeAgent: null,
        activeConnections: [],
        scenario,
        progress: 0,
      });

      // Kick off first event
      setTimeout(() => advanceEvent(), 500);
    },
    [clearTimer, advanceEvent]
  );

  const pauseDemo = useCallback(() => {
    clearTimer();
    setState((prev) => ({ ...prev, isPaused: true }));
  }, [clearTimer]);

  const resumeDemo = useCallback(() => {
    setState((prev) => ({ ...prev, isPaused: false }));
  }, []);

  const stopDemo = useCallback(() => {
    clearTimer();
    allEventsRef.current = [];
    setState(initialState);
  }, [clearTimer]);

  return {
    state,
    scenarios,
    startDemo,
    pauseDemo,
    resumeDemo,
    stopDemo,
  };
}
