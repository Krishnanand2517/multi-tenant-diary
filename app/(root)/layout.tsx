import type { Metadata } from "next";
import { DM_Sans, Lora, Playfair_Display } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import "@/app/globals.css";
import Navbar from "@/app/components/navbar";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diarist",
  description: "A platform to create your personal diary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${playfair.variable} ${lora.variable} antialiased bg-stone-100 text-stone-900 min-h-dvh`}
        >
          <Navbar />

          <Toaster
            position="bottom-right"
            theme="light"
            toastOptions={{
              classNames: {
                toast: "font-serif italic text-stone-700 border-stone-200 bg-stone-50",
              },
            }}
          />

          <main className="max-w-5xl mx-auto px-6 py-8">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
