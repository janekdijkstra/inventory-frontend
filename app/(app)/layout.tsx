import {SessionProvider} from "@/components/auth/session-provider";
import {QueryClientProvider} from "@/components/query-client-provider";
import {redirect} from "next/navigation";
import {AccountMenu, MenuBarView} from "@brynlabs/fusion-ui";
import Image from "next/image";
import logo from "@/assets/logo.png";
import {getAccessToken} from "@/auth";
import {Reload} from "@/components/auth/reload";
import RefreshSession from "@/components/auth/refresh-session";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {token} = await getAccessToken();

  if (!token) {
    return redirect("/api/auth/signin");
  }

  // eslint-disable-next-line react-hooks/purity
  if (token?.expires_at && Date.now() > token.expires_at * 1000 - 10000) {
    return (
      <SessionProvider
        refetchOnWindowFocus={typeof navigator !== "undefined" && navigator.onLine}
        refetchWhenOffline={false}>
        <Reload />
      </SessionProvider>
    );
  }

  return (
    <SessionProvider
      refetchOnWindowFocus={typeof navigator !== "undefined" && navigator.onLine}
      refetchWhenOffline={false}>
      <RefreshSession />
      <QueryClientProvider>
        <MenuBarView
          logo={<Image src={logo} alt={"foolsparadise"}></Image>}
          extraContent={
            <>
              {/*<CommandMenuTrigger></CommandMenuTrigger>*/}
              <AccountMenu></AccountMenu>
            </>
          }
          menuItems={<></>}>
          {children}
        </MenuBarView>
      </QueryClientProvider>
    </SessionProvider>
  );
}
