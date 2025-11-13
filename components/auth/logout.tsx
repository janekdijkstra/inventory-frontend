"use client";

import {signOut, useSession} from "next-auth/react";

export const Logout = () => {
  const {data: session, update} = useSession();
  if (session) {
    return (
      <div>
        <p className={"body-font"}>
          Du bist aktuell mit der E-Mail Adresse {session.user.email} angemeldet.
        </p>
        <br/>
        <button onClick={() => signOut({
          redirectTo: "/api/auth/postsignout",
        })}>Abmelden
        </button>

        <button onClick={() => {
          fetch("/api/test");
        }}>Test Api call
        </button>

        <button onClick={() => {
          update()
        }}>update session
        </button>
      </div>
    );
  }
  return null;
};
