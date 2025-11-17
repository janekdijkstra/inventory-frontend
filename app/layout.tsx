import {FusionUIProvider} from "@brynlabs/fusion-ui";
import {Inter} from "next/font/google";

const inter = Inter({
  weight: "variable",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

import "@brynlabs/fusion-css/dist/fusion.css";
import {QueryClientProvider} from "@/components/query-client-provider";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "FusionUI Starter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <FusionUIProvider>
        <QueryClientProvider>{children}</QueryClientProvider>
      </FusionUIProvider>
    </html>
  );
}
