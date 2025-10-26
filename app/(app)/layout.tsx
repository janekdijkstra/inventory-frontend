import {SessionProvider} from "@/components/auth/session-provider";
import {QueryClientProvider} from "@/components/query-client-provider";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {redirect} from "next/navigation";
import {AccountMenu, MenuBarView} from "@brynlabs/fusion-ui";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return (
    <SessionProvider
      refetchOnWindowFocus={typeof navigator !== "undefined" && navigator.onLine}
      refetchWhenOffline={false}>
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
