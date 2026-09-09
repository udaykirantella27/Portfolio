import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://udaykiran.dev'),
  title: {
    default: 'Uday Kiran Tella | Full Stack Developer & Product Engineer',
    template: '%s | Uday Kiran Tella',
  },
  description:
    'Portfolio of Uday Kiran Tella, a Full Stack Developer building high-performance web applications, enterprise dashboards, and scalable APIs with React, Next.js, Node.js, and PostgreSQL.',
  keywords: [
    'Uday Kiran Tella',
    'Full Stack Developer',
    'MERN Stack Developer',
    'React Developer',
    'Next.js Engineer',
    'Node.js Developer',
    'PostgreSQL',
    'Bengaluru',
    'Portfolio',
  ],
  authors: [{ name: 'Uday Kiran Tella', url: 'https://udaykiran.dev' }],
  creator: 'Uday Kiran Tella',
  openGraph: {
    title: 'Uday Kiran Tella | Full Stack Developer & Product Engineer',
    description:
      'Full Stack Developer building responsive products, scalable architecture, and reliable APIs.',
    url: 'https://udaykiran.dev',
    siteName: 'Uday Kiran Tella Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uday Kiran Tella | Full Stack Developer',
    description:
      'Full Stack Developer building responsive products, scalable architecture, and reliable APIs.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
