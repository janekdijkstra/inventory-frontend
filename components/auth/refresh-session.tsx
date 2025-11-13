"use client";

import {useSession} from "next-auth/react";
import {useEffect} from "react";

export default function RefreshSession() {
  const refreshInterval = 10000;

  const {data: session, update} = useSession();

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!session?.token_expires_at) return;
      const expiresIn = session.token_expires_at * 1000 - Date.now();
      console.log(`Token expires in ${expiresIn / 1000}s`);
      if (expiresIn > 20000) {
        return;
      }

      try {
        console.log("refreshing...");
        await update();
      } catch (error) {
        console.error("Failed to refresh access token:", error);
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [session?.token_expires_at, update, refreshInterval]);

  return null;
}
