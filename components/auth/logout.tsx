"use client";

import {signOut, useSession} from "next-auth/react";

export const Logout = () => {
  const {data: session} = useSession();
  if (session) {
    return (
      <div>
        <p className={"body-font"}>
          Du bist aktuell mit der E-Mail Adresse {session.user.email} angemeldet.
        </p>
        <br />
        <button
          onClick={() =>
            signOut({
              redirectTo: "/api/auth/postsignout",
            })
          }>
          Abmelden
        </button>
      </div>
    );
  }
  return null;
};
