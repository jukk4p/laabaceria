import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import NavbarWrapper from "@/components/NavbarWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import SchemaMarkup from "@/components/SchemaMarkup";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-body",
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Abacería | Jamones y Embutidos Gourmet · Coria del Río, Sevilla",
  description: "Tienda especializada en jamones ibéricos, embutidos artesanales y productos gourmet en Coria del Río, Sevilla. Calidad artesanal y tradición.",
  keywords: ["jamón ibérico", "Coria del Río", "Sevilla", "gourmet", "embutidos", "delicatessen"],
  authors: [{ name: "La Abacería" }],
  openGraph: {
    title: "La Abacería | Jamones y Embutidos Gourmet",
    description: "El arte del jamón ibérico en Coria del Río.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${lato.variable}`}>
        <SchemaMarkup />
        <NavbarWrapper />
        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}
