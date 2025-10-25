"use client";

import {signOut, useSession} from "next-auth/react";
import {useEffect, useRef} from "react";

export default function RefreshAccessToken() {
  const refreshInterval = 10000;

  const {data: session, update} = useSession();

  useEffect(() => {
    if (!session?.access_token) return;

    const tokenPayload = JSON.parse(atob(session.access_token.split(".")[1]));

    const interval = setInterval(async () => {
      const expiresIn = tokenPayload.exp * 1000 - Date.now();
      console.log(`Token expires in ${expiresIn / 1000}s`);
      if (expiresIn > 20000) {
        return;
      }

      try {
        await update();
      } catch (error) {
        console.error("Failed to refresh access token:", error);
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [session?.access_token, update, refreshInterval]);

  useEffect(() => {
    console.log(session);
  }, [session]);

  return null;
}
