import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cream">
      <Link href="/tandil-ciudad-intermedia" aria-label="Ir al especial">
        <Image
          src="/logo.png"
          alt="El Eco de Tandil"
          width={200}
          height={60}
          className="h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
          priority
        />
      </Link>
    </main>
  )
}
