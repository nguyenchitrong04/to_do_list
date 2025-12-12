// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Blue Tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* Nền Gradient xanh dương */}
          <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 text-slate-800">
            
            {/* Navbar */}
            <nav className="bg-white/70 backdrop-blur-md border-b border-blue-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow shadow-blue-300">
                  <span className="text-white font-bold">TM</span>
                </div>
                <h1 className="text-xl font-bold text-blue-900 tracking-tight">Task<span className="text-blue-600">Master</span></h1>
              </div>
              <div className="bg-white rounded-full p-1 border border-blue-100 shadow-sm">
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </nav>

            <main className="max-w-3xl mx-auto p-4 md:p-8">
              {children}
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}