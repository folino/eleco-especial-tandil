import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { LenisProvider } from '@/components/ui/LenisProvider'
import Header from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'Tandil: La ciudad que creció antes de decidir quién quería ser | El Eco',
  description: 'Cómo una ciudad intermedia del sur bonaerense se convirtió en uno de los fenómenos urbanos más llamativos de la Argentina. Expansión, desarrollo y un modelo urbano en discusión.',
  openGraph: {
    title: 'Tandil: La ciudad que creció antes de decidir quién quería ser',
    description: 'Expansión, desarrollo y un modelo urbano en discusión. Un especial de El Eco de Tandil.',
    type: 'article',
    locale: 'es_AR',
    siteName: 'El Eco de Tandil',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tandil: La ciudad que creció antes de decidir quién quería ser',
    description: 'Un especial de El Eco de Tandil sobre el fenómeno urbano más llamativo de la Argentina.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <Script
          id="clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "vzo26ivjml");`,
          }}
        />
        <LenisProvider>
          <Header />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  )
}
