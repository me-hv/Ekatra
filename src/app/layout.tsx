import type { Metadata } from "next";
import { Instrument_Serif, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/context/AudioContext";
import { Header } from "@/components/Header";
import { GlobalPlayer } from "@/components/GlobalPlayer";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EKATRA — Creative Archive",
  description: "Personal creative archive of EKATRA — rapper, music producer, writer, and creative technologist.",
  keywords: ["EKATRA", "Rapper", "Music Producer", "Creative Technologist", "Hip Hop", "Modular Synth", "Writing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${instrumentSerif.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="antialiased min-h-screen bg-background text-foreground selection:bg-accent selection:text-black font-sans"
        suppressHydrationWarning
      >
        {/* Film Grain Texture Overlay */}
        <div className="bg-grain" aria-hidden="true" />

        <AudioProvider>
          <Header />
          <main className="pt-20 pb-32 min-h-screen relative z-10">
            {children}
          </main>
          <GlobalPlayer />
        </AudioProvider>
      </body>
    </html>
  );
}
