"use client";

import {useSession} from "next-auth/react";
import {useEffect} from "react";

export const Reload = () => {
  const session = useSession();

  useEffect(() => {
    if (session.data) {
      location.reload();
    }
  }, [session.data]);

  return <></>;
};
