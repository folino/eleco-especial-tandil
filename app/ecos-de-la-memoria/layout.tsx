import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ecos de la Memoria en Tandil — El Eco de Tandil',
  description:
    'A medio siglo del golpe cívico-militar, un recorrido por las heridas, los silencios y las resistencias en una ciudad que también fue escenario del terrorismo de Estado.',
  openGraph: {
    title: 'Ecos de la Memoria en Tandil',
    description:
      'A medio siglo del golpe cívico-militar, un recorrido por las heridas, los silencios y las resistencias en una ciudad que también fue escenario del terrorismo de Estado.',
    url: 'https://eleco.com.ar/ecos-de-la-memoria',
    siteName: 'El Eco de Tandil',
    images: [
      {
        url: '/ecos-de-la-memoria-tandil/documental_24m.webp',
        width: 1920,
        height: 1080,
        alt: 'Ecos de la Memoria en Tandil — El Eco de Tandil',
      },
    ],
    locale: 'es_AR',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ecos de la Memoria en Tandil',
    description:
      'A medio siglo del golpe cívico-militar, un recorrido por las heridas, los silencios y las resistencias en Tandil.',
    images: ['/ecos-de-la-memoria-tandil/documental_24m.webp'],
  },
  alternates: {
    canonical: 'https://eleco.com.ar/ecos-de-la-memoria',
  },
}

export default function EcosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
