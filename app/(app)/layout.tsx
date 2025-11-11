import {SessionProvider} from "@/components/auth/session-provider";
import {QueryClientProvider} from "@/components/query-client-provider";
import {redirect} from "next/navigation";
import {AccountMenu, MenuBarView} from "@brynlabs/fusion-ui";
import Image from "next/image";
import logo from "@/assets/logo.png";
import {getAccessToken} from "@/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {token, session} = await getAccessToken();

  if (!token) {
    return redirect("/api/auth/signin");
  }

  return (
    <SessionProvider
      refetchOnWindowFocus={typeof navigator !== "undefined" && navigator.onLine}
      refetchWhenOffline={false}
      session={session}
    >
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
