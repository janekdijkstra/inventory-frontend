import KeycloakProvider from "next-auth/providers/keycloak";
import {AuthOptions, Session} from "next-auth";
import {sha256} from "js-sha256";
import {JWT} from "next-auth/jwt";

const extractInitials = (name: string | null | undefined): string => {
  if (!name) {
    return "";
  }

  return name
    .split(/\s+/)
    .map(str => str.at(0) || "")
    .join("");
};

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID!,
      clientSecret: process.env.KEYCLOAK_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        // First-time login, save the `access_token`, its expiry and the `refresh_token`
        return {
          ...token,
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
              client_id: process.env.KEYCLOAK_ID!,
              client_secret: process.env.KEYCLOAK_SECRET!,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token!,
            }),
          });

          const tokensOrError = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            access_token: string;
            expires_in: number;
            refresh_token?: string;
          };

          return {
            ...token,
            access_token: newTokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
            // Some providers only issue refresh tokens once, so preserve if we did not get a new one
            refresh_token: newTokens.refresh_token ? newTokens.refresh_token : token.refresh_token,
          };
        } catch (error) {
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
        user: {
          ...session.user,
          image: session.user?.email
            ? `https://www.gravatar.com/avatar/${sha256(session.user.email)}.jpg?d=initials&initials=${extractInitials(session.user.name)}`
            : undefined,
        },
      };
    },
  },
};
