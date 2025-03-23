import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/header";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SUM-AI - AI-Powered PDF Summarization",
  description:
    "Save hours  of reading  time. Transform lengthy PDFs into clear, accurate summaries in seconds with advanced AI Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} font-sans antialiased`}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1"> {children}</main>
            <Toaster />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
