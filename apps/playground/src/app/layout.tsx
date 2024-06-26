import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JMT',
  description: 'Generated by create next app',
  icons: {
    icon: '/favicon.ico',
  },
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
