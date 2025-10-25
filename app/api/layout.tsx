import type {Metadata} from "next";
import {SessionProvider} from "@/components/auth/session-provider";
import {QueryClientProvider} from "@/components/query-client-provider";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";

export const metadata: Metadata = {
  title: "LeadRaum",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="de">
      <body className={"fp-base-style-scope body surface surface--secondary"}>
        <SessionProvider
          refetchOnWindowFocus={typeof navigator !== "undefined" && navigator.onLine}
          refetchWhenOffline={false}>
          <QueryClientProvider>
            <main className={"container container-block"}>{children}</main>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
