import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Student Sports Portal", description: "A bilingual student sports portal starter." };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html suppressHydrationWarning><body>{children}</body></html>; }

