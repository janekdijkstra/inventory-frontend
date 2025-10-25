import {FusionUIProvider} from "@brynlabs/fusion-ui";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: "variable",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

import "@brynlabs/bryn-css/dist/bryn.css"; // Install bryn-css

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
    <FusionUIProvider> {/* Replace your body with the FusionUIProvider */}
      {children}
    </FusionUIProvider>
    </html>
  );
}
