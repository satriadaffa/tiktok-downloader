import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tikdown.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TikDown — Download Video TikTok Tanpa Watermark",
    template: "%s | TikDown",
  },
  description:
    "Download video TikTok tanpa watermark gratis. Simpan video & musik TikTok ke HP atau PC dalam kualitas HD. Cepat, mudah, tanpa install aplikasi.",
  keywords: [
    "download video tiktok",
    "tiktok tanpa watermark",
    "download tiktok mp4",
    "save tiktok video",
    "tiktok downloader online",
    "download musik tiktok",
    "tiktok mp3 downloader",
  ],
  authors: [{ name: "TikDown" }],
  creator: "TikDown",
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "TikDown",
    title: "TikDown — Download Video TikTok Tanpa Watermark",
    description:
      "Download video TikTok tanpa watermark, gratis dan cepat. Tanpa aplikasi, langsung dari browser.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TikDown — TikTok Video Downloader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TikDown — Download Video TikTok Tanpa Watermark",
    description:
      "Download video TikTok tanpa watermark, gratis dan cepat. Tanpa aplikasi, langsung dari browser.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Isi setelah daftar ke Google Search Console
    google: process.env.GOOGLE_SITE_VERIFICATION ?? "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}