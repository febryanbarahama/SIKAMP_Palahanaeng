import { Outfit } from "next/font/google";
import "./globals.css";

// Konfigurasi Google Font Outfit
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={outfit.variable}>
      <body className="font-sans antialiased bg-clean-gradient text-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
