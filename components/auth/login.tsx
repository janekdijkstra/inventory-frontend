"use client";

import {signIn, useSession} from "next-auth/react";
import {useSearchParams} from "next/navigation";

export const Login = () => {
  const searchParams = useSearchParams();

  let callbackUrl = searchParams.get("callbackUrl") || "/";
  searchParams
    .keys()
    .filter(key => key !== "callbackUrl")
    .forEach(key => {
      callbackUrl += "?" + key + "=" + searchParams.get(key);
    });

  const {data: session} = useSession();
  if (!session) {
    signIn("keycloak", {redirectTo: callbackUrl});
  }

  return <></>;
};
