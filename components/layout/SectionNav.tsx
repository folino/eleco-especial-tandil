'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'inicio',      label: 'Inicio' },
  { id: 'apertura',    label: 'Apertura' },
  { id: 'contexto',    label: 'Ciudades intermedias' },
  { id: 'historia',    label: 'Transformación' },
  { id: 'numeros',     label: 'Los números' },
  { id: 'dos-caras',   label: 'Las dos caras' },
  { id: 'bisagra',     label: 'El momento bisagra' },
  { id: 'historias',   label: 'Las historias' },
  { id: 'comparacion', label: 'Tandil y Aubenas' },
]

export default function SectionNav() {
  const [active, setActive] = useState<string>('inicio')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Show nav only after scrolling past hero
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      aria-label="Navegación por secciones"
      className={`fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3
                  transition-all duration-500 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}
    >
      {sections.map(({ id, label }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={`Ir a: ${label}`}
            className="group relative flex items-center justify-end gap-2"
          >
            {/* Label tooltip — solo en hover */}
            <span
              className="absolute right-full mr-2 whitespace-nowrap text-xs font-body px-2 py-1 rounded
                         bg-text-primary/80 text-white pointer-events-none
                         opacity-0 translate-x-1 transition-all duration-200
                         group-hover:opacity-100 group-hover:translate-x-0"
            >
              {label}
            </span>

            {/* Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-3 h-3 bg-sierra'
                  : 'w-2 h-2 bg-text-secondary/30 group-hover:bg-sierra/60'
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}
