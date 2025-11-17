import type {Metadata} from "next";
import {SessionProvider} from "@/components/auth/session-provider";
import {QueryClientProvider} from "@/components/query-client-provider";
import {auth} from "@/auth";

export const metadata: Metadata = {
  title: "APPLICATION_NAME",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

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
