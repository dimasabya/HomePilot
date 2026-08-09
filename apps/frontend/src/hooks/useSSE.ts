"use client";

import { useEffect } from "react";

export function useSSE(onMessage: (data: unknown) => void) {
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    const eventSource = new EventSource(`${apiUrl}/events`);

    eventSource.onopen = () => {
      console.log("✅ SSE Connected");
    };

    eventSource.onerror = (error) => {
      console.error("❌ SSE Error", error);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (err) {
        console.error("Invalid SSE data", err);
      }
    };

    return () => {
      eventSource.close();
      console.log("SSE Closed");
    };
  }, [onMessage]);
}
