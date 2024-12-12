import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products List",
  description: "A starter generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
