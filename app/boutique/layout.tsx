import type { Metadata, Viewport } from "next";
import { GOOGLE_SITE_VERIFICATION, PUBLIC_SITE_URL, STOREFRONT_URL } from "../../lib/site";
import "./storefront-modern.css";
import "./legal.css";

const title = "YAJI MOVE — Montres, bijoux et portefeuilles au Maroc";
const description = "YAJI MOVE : montres, bijoux, portefeuilles et packs cadeaux. Livraison partout au Maroc, paiement à la livraison, confirmation par téléphone.";

export const metadata: Metadata = {
  metadataBase: new URL(PUBLIC_SITE_URL),
  title: { default: title, template: "%s · YAJI MOVE" },
  description,
  applicationName: "YAJI MOVE",
  keywords: ["YAJI MOVE", "YajiMove", "Yaji", "montres Maroc", "bijoux Maroc", "portefeuille homme Maroc", "coffret cadeau Maroc", "paiement à la livraison"],
  alternates: { canonical: STOREFRONT_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/brand/favicon-jy.svg", type: "image/svg+xml" }, { url: "/brand/jy-512.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/brand/favicon-jy.svg",
    apple: "/brand/jy-180.png",
  },
  openGraph: {
    type: "website",
    url: STOREFRONT_URL,
    siteName: "YAJI MOVE",
    title,
    description,
    locale: "fr_MA",
    alternateLocale: ["ar_MA", "en_US"],
    images: [{ url: "/brand/og-yaji-move.jpg", width: 1200, height: 630, alt: "YAJI MOVE — Yallah, aji move" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/brand/og-yaji-move.jpg"] },
  ...(GOOGLE_SITE_VERIFICATION ? { verification: { google: GOOGLE_SITE_VERIFICATION } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#0e0c0c",
  colorScheme: "dark",
};

export default function BoutiqueLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
