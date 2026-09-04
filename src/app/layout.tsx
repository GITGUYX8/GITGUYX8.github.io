import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://gitguyx8.github.io"
  ),
  title: "Yashvardhan Singh",
  description:
    "Yashvardhan Singh (GITGUYX8) — Software Engineer building cloud-native platforms, backend systems, and robotics tooling.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "256x256" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Yashvardhan Singh",
    description:
      "Software Engineer — Cloud & DevOps, backend systems, and robotics tooling.",
    url: "https://gitguyx8.github.io",
    siteName: "Yashvardhan Singh",
    type: "website",
    images: [
      {
        url: "https://gitguyx8.github.io/og-image.jpg",
        secureUrl: "https://gitguyx8.github.io/og-image.jpg",
        width: 1024,
        height: 576,
        type: "image/jpeg",
        alt: "Yashvardhan Singh — Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yashvardhan Singh",
    description:
      "Software Engineer — Cloud & DevOps, backend systems, and robotics tooling.",
    images: ["https://gitguyx8.github.io/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col dark:bg-black dark:text-zinc-50 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
