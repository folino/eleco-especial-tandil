'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FadeIn from '@/components/ui/FadeIn'
import AnimatedCounter from '@/components/interactive/AnimatedCounter'
import dynamic from 'next/dynamic'

gsap.registerPlugin(ScrollTrigger)

const TandilMap = dynamic(() => import('@/components/interactive/TandilMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] md:h-[500px] bg-white/5 rounded-lg animate-pulse flex items-center justify-center">
      <span className="text-white/30 text-sm">Cargando mapa...</span>
    </div>
  ),
})

export default function TwoFacesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-dark text-white relative overflow-hidden"
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="relative z-10 max-w-content mx-auto px-5 md:px-8">
        {/* Header */}
        <FadeIn className="text-center mb-10 md:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-accent-alert/70 mb-4 font-body">
            La otra cara
          </p>
          <h2 className="font-display text-section-title text-white">
            Las dos caras de un Tandil
          </h2>
          <p className="mt-4 text-white/60 font-body text-lg max-w-2xl mx-auto">
            Tandil está creciendo más rápido de lo que logra ordenarse. Su escala todavía 
            permitiría planificar con anticipación, pero la velocidad del crecimiento la empuja 
            hacia problemas propios de áreas metropolitanas mucho más grandes.
          </p>
        </FadeIn>

        {/* Alert data grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 max-w-4xl mx-auto mb-14 md:mb-20">
          <FadeIn delay={0}>
            <div className="text-center">
              <span className="block font-mono text-3xl md:text-4xl font-medium text-accent-alert tracking-tight">
                77,2%
              </span>
              <span className="block mt-2 text-xs text-white/40 uppercase tracking-wide">
                Expansión urbana 40 años
              </span>
              <span className="block text-xs text-white/25 mt-1">
                vs 35% promedio nacional
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="text-center">
              <span className="block font-mono text-3xl md:text-4xl font-medium text-accent-alert tracking-tight">
                30%
              </span>
              <span className="block mt-2 text-xs text-white/40 uppercase tracking-wide">
                Hogares inquilinos
              </span>
              <span className="block text-xs text-white/25 mt-1">
                era 15,5% en 2001
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="text-center">
              <span className="block font-mono text-3xl md:text-4xl font-medium text-accent-warm tracking-tight">
                12
              </span>
              <span className="block mt-2 text-xs text-white/40 uppercase tracking-wide">
                Barrios populares
              </span>
              <span className="block text-xs text-white/25 mt-1">
                1.328 familias
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="text-center">
              <span className="block font-mono text-3xl md:text-4xl font-medium text-accent-alert tracking-tight">
                #1
              </span>
              <span className="block mt-2 text-xs text-white/40 uppercase tracking-wide">
                Dificultad habitacional
              </span>
              <span className="block text-xs text-white/25 mt-1">
                en provincia de Buenos Aires
              </span>
            </div>
          </FadeIn>
        </div>

        {/* Interactive Map */}
        <FadeIn className="mb-14 md:mb-20">
          <div className="rounded-lg overflow-hidden border border-white/10">
            <TandilMap />
          </div>
          <p className="text-xs text-white/30 mt-3 text-center">
            La Ruta 226 y las vías del ferrocarril actúan como barreras físicas que fragmentan 
            el tejido urbano y refuerzan las desigualdades territoriales.
          </p>
        </FadeIn>

        {/* Text content */}
        <div className="max-w-prose-wide mx-auto">
          <FadeIn>
            <p className="text-body-lg text-white/70 mb-6 leading-relaxed">
              Coexisten dos Tandiles. Uno con servicios, infraestructura consolidada y acceso 
              pleno a los bienes que la ciudad ofrece. Otro con carencias estructurales en agua, 
              cloacas, gas, pavimento y pluviales.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-body-lg text-white/70 mb-6 leading-relaxed">
              La planta de tratamiento de efluentes diseñada para operar durante dos décadas 
              llegó a su límite en un plazo considerablemente menor y hoy opera al máximo de su 
              capacidad. La proyección demográfica pensada a 20 años fue alcanzada en 
              aproximadamente diez.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-body-lg text-white/70 mb-6 leading-relaxed">
              Más construcción, más demanda insatisfecha, menos propietarios. Es la ecuación de 
              un mercado que produce ciudad para quienes tienen capital, no necesariamente para 
              quienes la habitan y la necesitan.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
