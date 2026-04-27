import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Virtuálny turistický chodník Hubina",
  description: "Moderný digitálny sprievodca po miestach a príbehoch Hubiny.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
