"use client";

import { useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";

export function useSession() {
  const sessionIdRef = useRef<string | null>(null);

  const startSession = useCallback(async () => {
    const { data, error } = await supabase
      .from("sessions")
      .insert({})
      .select("id")
      .single();

    if (error) {
      console.error("Failed to start session:", error);
      return null;
    }

    sessionIdRef.current = data.id;
    return data.id;
  }, []);

  const endSession = useCallback(async () => {
    if (!sessionIdRef.current) return;

    await supabase
      .from("sessions")
      .update({ ended_at: new Date().toISOString() })
      .eq("id", sessionIdRef.current);

    sessionIdRef.current = null;
  }, []);

  const trackEvent = useCallback(
    async (
      eventType: string,
      entityId?: string,
      metadata?: Record<string, unknown>
    ) => {
      if (!sessionIdRef.current) return;

      await supabase.from("events").insert({
        session_id: sessionIdRef.current,
        event_type: eventType,
        entity_id: entityId || null,
        metadata: metadata || null,
      });
    },
    []
  );

  const trackFeedback = useCallback(
    async (lookId: string, liked: boolean) => {
      if (!sessionIdRef.current) return;

      await supabase.from("feedback").insert({
        session_id: sessionIdRef.current,
        look_id: lookId,
        liked,
      });
    },
    []
  );

  const setPersona = useCallback(async (personaId: string) => {
    if (!sessionIdRef.current) return;

    await supabase
      .from("sessions")
      .update({ persona_id: personaId })
      .eq("id", sessionIdRef.current);
  }, []);

  return {
    sessionId: sessionIdRef,
    startSession,
    endSession,
    trackEvent,
    trackFeedback,
    setPersona,
  };
}
