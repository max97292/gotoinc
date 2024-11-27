"use client";

import { useEffect, useState } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { usePathname, useRouter } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const location = usePathname();
  const isLoginPage = location === "/login";

  useEffect(() => {
    if (isLoginPage) {
      return;
    }

    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push("/login");
    }
  }, [router, location]);

  return (
    <html lang="en">
      <head>
        <title>Posts App</title>
        <meta
          name="description"
          content="Discover and explore a curated collection of posts showcasing engaging titles and content summaries. Stay informed and entertained with dynamic and real-time posts, all fetched seamlessly from an external API for a smooth browsing experience."
        ></meta>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        {isAuthenticated === null && !isLoginPage ? (
          <div className="flex items-center justify-center min-h-screen p-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Loading...</h1>
            </div>
          </div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
