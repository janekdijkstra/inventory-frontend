import {DefaultSession} from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    token_expires_at?: number,
    user: DefaultSession["user"] & {
      image?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
    expires_at?: number;
    refresh_token?: string;
    id_token?: string;
  }
}
