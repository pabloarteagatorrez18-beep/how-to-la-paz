import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });
const sans = Manrope({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "How To La Paz — Descubre la ciudad como un paceño",
  description: "Historias, lugares, cultura y experiencias para vivir La Paz desde una perspectiva local.",
  metadataBase: new URL("https://how-to-la-paz-editorial.pabloarteaga.chatgpt.site"),
  openGraph: {
    title: "How To La Paz — Descubre La Paz como un paceño",
    description: "Historias, lugares y experiencias para vivir La Paz desde una perspectiva local.",
    images: [{ url: "/og.png", width: 1732, height: 909, alt: "How To La Paz" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How To La Paz — Descubre La Paz como un paceño",
    description: "Historias, lugares y experiencias para vivir La Paz desde una perspectiva local.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${serif.variable} ${sans.variable}`}>{children}</body></html>;
}
