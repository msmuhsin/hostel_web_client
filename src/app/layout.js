"use clinet";

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "./context/ThemeProvider.js";

export const metadata = {
  title: "Hostel Management System",
  description: "A hostel management system for students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="system"
          attribute="class"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
