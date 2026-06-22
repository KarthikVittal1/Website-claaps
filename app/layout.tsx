import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/global/SkipLink";
import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { organizationJsonLd } from "@/lib/schema/organization";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono-ibm",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://claaps.com"),
  title: {
    default: "Claaps Technology Services | Oracle GRC & Risk Compliance Specialists",
    template: "%s | Claaps Technology Services",
  },
  description:
    "Claaps Technology Services specializes in Oracle GRC, Oracle Risk Management Cloud, regulatory compliance consulting, risk advisory, and managed support for enterprise risk and compliance teams.",
  openGraph: {
    title: "Claaps Technology Services",
    description:
      "Oracle Governance, Risk & Compliance specialists for enterprise risk and compliance teams.",
    url: "https://claaps.com",
    siteName: "Claaps Technology Services",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = organizationJsonLd();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy-950 text-offwhite-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
