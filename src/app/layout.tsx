import { Analytics } from "@vercel/analytics/next";
import Providers from "@/components/providers";
import "./globals.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

type Props = {
  children: React.ReactNode;
};

export function generateMetadata() {
  const description =
    "Verkron provides expert solutions in pricing strategies, operations, inventory management, technical drafting, corporate branding, supply chain optimization, and industrial product design. Our goal is to enhance efficiency, drive innovation, and support businesses in achieving operational excellence.";
  return {
    metadataBase: new URL("https://verkron.com"),
    title: "Verkron",
    description,
    openGraph: {
      title: "Verkron",
      description,
      url: "https://verkron.com",
      siteName: "Verkron",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Verkron",
      description,
    },
  };
}
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="/favicon-96x96.png"
          rel="icon"
          sizes="96x96"
          type="image/png"
        />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link href="/site.webmanifest" rel="manifest" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} flex min-h-dvh flex-col antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="container mx-auto min-h-[calc(100vh-4rem-24rem)] max-w-6xl flex-1 px-4">
            {children}
          </main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
