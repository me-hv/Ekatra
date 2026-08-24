import type { Metadata } from "next";
import "./globals.css";
import { AudioProvider } from "@/context/AudioContext";
import { Header } from "@/components/Header";
import { GlobalPlayer } from "@/components/GlobalPlayer";

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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground selection:bg-accent selection:text-black">
        {/* Subtle Film Grain SVG Noise Filter Overlay */}
        <div className="bg-grain" aria-hidden="true" />

        <AudioProvider>
          <Header />
          <main className="pt-16 pb-32 min-h-screen relative z-10">
            {children}
          </main>
          <GlobalPlayer />
        </AudioProvider>
      </body>
    </html>
  );
}
