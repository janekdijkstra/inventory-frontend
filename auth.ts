import NextAuth, {Session} from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import {cookies} from "next/headers";
import {decode} from "@auth/core/jwt";
import {JWT} from "next-auth/jwt";
import {sha256} from "js-sha256";

const extractInitials = (name: string | null | undefined): string => {
  if (!name) {
    return "";
  }

  return name
    .split(/\s+/)
    .map(str => str.at(0) || "")
    .join("");
};

export const {auth, handlers, signIn, signOut} = NextAuth({
  providers: [Keycloak],
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        // First-time login, save the `access_token`, its expiry and the `refresh_token`
        return {
          ...token,
          id_token: account.id_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
        };
      } else if (token.expires_at && Date.now() < token.expires_at * 1000 - 20000) {
        // Subsequent logins, but the `access_token` is still valid
        return token;
      } else {
        // Subsequent logins, but the `access_token` has expired, try to refresh it
        if (!token.refresh_token) throw new TypeError("Missing refresh_token");

        try {
          // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
          // at their `/.well-known/openid-configuration` endpoint.
          // i.e. https://accounts.google.com/.well-known/openid-configuration
          const response = await fetch(process.env.KEYCLOAK_TOKEN_ENDPOINT!, {
            method: "POST",
            body: new URLSearchParams({
              client_id: process.env.AUTH_KEYCLOAK_ID!,
              client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token!,
            }),
          });

          const tokensOrError = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            access_token: string;
            id_token?: string;
            expires_in: number;
            refresh_token?: string;
          };

          return {
            ...token,
            id_token: newTokens.id_token ? newTokens.id_token : token.id_token,
            access_token: newTokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
            // Some providers only issue refresh tokens once, so preserve if we did not get a new one
            refresh_token: newTokens.refresh_token ? newTokens.refresh_token : token.refresh_token,
          };
        } catch (error) {
          console.log(`Error refreshing accesstoken: ${error}`);
          return null as unknown as JWT;
        }
      }
    },
    async session({session, token}): Promise<Session> {
      if (!token) {
        // no token without session
        throw new Error("unauthorized");
      }

      return {
        ...session,
        token_expires_at: token.expires_at,
        user: {
          ...session.user,
          image: session.user?.email
            ? `https://www.gravatar.com/avatar/${sha256(session.user.email)}.jpg?d=initials&initials=${extractInitials(session.user.name)}`
            : undefined,
        },
      };
    },
  },
  events: {
    async signOut(message) {
      if (message.hasOwnProperty("token")) {
        const token = (message as {token: JWT | null}).token;
        if (!token?.id_token) return;
        const issuerUrl = process.env.AUTH_KEYCLOAK_ISSUER!;
        const logOutUrl = new URL(`${issuerUrl}/protocol/openid-connect/logout`);
        logOutUrl.searchParams.set("id_token_hint", token.id_token);
        await fetch(logOutUrl);
      }
    },
  },
  session: {
    strategy: "jwt",
  },
});

export const getAccessToken = async (): Promise<
  {token: JWT; session: Session} | {token: null; session: null}
> => {
  const session = await auth();
  if (!session) return {token: null, session: null};

  const cookieStore = await cookies();

  const baseCookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token";

  // Collect all cookie parts that start with the base name
  const cookieParts = cookieStore
    .getAll()
    .filter(({name}) => name === baseCookieName || name.startsWith(`${baseCookieName}.`))
    .sort((a, b) => {
      const getIndex = (n: string) => Number(n.split(".").pop() ?? 0);
      return getIndex(a.name) - getIndex(b.name);
    });

  if (cookieParts.length === 0) return {token: null, session: null};

  // Concatenate all parts
  const token = cookieParts.map(c => c.value).join("");

  // Decode the token
  const decodedToken = await decode({
    token,
    secret: process.env.AUTH_SECRET!,
    salt: baseCookieName,
  });

  if (!decodedToken) return {token: null, session: null};

  return {
    token: decodedToken,
    session,
  };
};
