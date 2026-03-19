'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FadeIn from '@/components/ui/FadeIn'
import PullQuote from '@/components/interactive/PullQuote'

gsap.registerPlugin(ScrollTrigger)

const distributionData = [
  { label: '> 200 mil hab.', cities: 40, population: '55%', width: 55, color: 'bg-text-primary/70' },
  { label: '20–200 mil hab.', cities: 198, population: '~30%', width: 30, color: 'bg-sierra', highlight: true },
  { label: '< 20 mil hab.', cities: 3278, population: '~20%', width: 20, color: 'bg-text-secondary/40' },
]

export default function IntermediaSection() {
  const chartRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!chartRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const bars = chartRef.current.querySelectorAll('.bar-fill')
    if (prefersReduced) {
      bars.forEach((bar) => gsap.set(bar, { scaleX: 1 }))
      return
    }

    bars.forEach((bar, i) => {
      gsap.fromTo(bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          delay: i * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: chartRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, { scope: chartRef })

  return (
    <section className="section-padding bg-cream noise-overlay">
      <div className="prose-editorial">
        <FadeIn>
          <p className="text-xs tracking-wide text-sierra mb-4 font-body">
            Contexto
          </p>
          <h2 className="font-display text-section-title text-text-primary mb-8">
            Qué es una ciudad intermedia y por qué importa
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p>
            Antes de adentrarse en la historia particular de Tandil, vale detenerse en el
            concepto que estructura toda esta discusión. Las ciudades intermedias no son
            simplemente ciudades de tamaño medio. Son algo más específico, más funcional, más
            estratégico en términos de desarrollo territorial. Son el tejido conectivo del
            territorio nacional, ese entramado invisible que une la gran metrópolis con el
            pequeño pueblo rural y que, durante décadas, recibió menos atención académica y
            política de la que merecía.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p>
            Estas urbes reúnen en general entre 20.000 y 200.000 habitantes, un rango que les
            permite ofrecer servicios y oportunidades sin perder la cercanía en la vida
            cotidiana. Pero más allá de su dimensión demográfica, su rasgo definitorio es el
            rol que cumplen en la organización del territorio. Funcionan como centros
            regionales que concentran salud, educación, comercio y administración, articulando
            la relación entre las zonas rurales y los grandes centros urbanos.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p>
            Son ciudades donde todavía es posible conocer al vecino, caminar al trabajo,
            llevar a los chicos al colegio en bicicleta y al mismo tiempo acceder a una oferta
            cultural, educativa y gastronómica que hace décadas era exclusiva de las grandes
            metrópolis. Esa combinación de escala humana y diversidad de servicios es
            exactamente lo que define su atractivo en el mundo contemporáneo.
          </p>
        </FadeIn>
      </div>

      {/* Distribution chart */}
      <div className="max-w-2xl mx-auto px-5 md:px-8 my-14 md:my-20">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.25em] text-text-secondary mb-8 font-body text-center">
            Distribución urbana argentina · 3.392 localidades
          </p>
        </FadeIn>

        <div ref={chartRef} className="space-y-6">
          {distributionData.map((item, i) => (
            <div key={i} className="group">
              <div className="flex items-baseline justify-between mb-2">
                <span className={`text-sm font-body ${item.highlight ? 'text-sierra font-semibold' : 'text-text-secondary'}`}>
                  {item.label}
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-xs text-text-secondary font-mono">
                    {item.cities.toLocaleString('es-AR')} ciudades
                  </span>
                  <span className={`font-mono text-lg font-medium ${item.highlight ? 'text-sierra' : 'text-text-primary'}`}>
                    {item.population}
                  </span>
                </div>
              </div>
              <div className="h-3 bg-section-light rounded-full overflow-hidden">
                <div
                  className={`bar-fill h-full rounded-full origin-left ${item.color} ${
                    item.highlight ? 'ring-2 ring-sierra/20 ring-offset-1' : ''
                  }`}
                  style={{ width: `${item.width}%`, transform: 'scaleX(0)' }}
                />
              </div>
            </div>
          ))}
        </div>

        <FadeIn className="mt-8">
          <p className="text-center text-sm text-text-secondary max-w-md mx-auto">
            <span className="text-sierra font-semibold">198 ciudades intermedias</span> donde
            vive casi el 30% de los argentinos. Sus costos de infraestructura pueden ser hasta
            un 50% menores que en grandes aglomeraciones.
          </p>
        </FadeIn>
      </div>

      <div className="prose-editorial">
        <FadeIn>
          <p>
            Un análisis de Ana Fehrmann para la Fundación Civilidad aporta perspectiva sobre
            el peso real de estas ciudades en el mapa argentino. Del total de 3.392 localidades
            del país según el Censo 2010, solo 40 superan los 200.000 habitantes y concentran
            algo más del 55 por ciento de la población nacional. En el otro extremo, 3.278
            localidades tienen menos de 20.000 habitantes y reúnen menos del 20 por ciento
            de la población. Entre ambos extremos se ubican exactamente 198 localidades que
            responden al perfil de ciudades intermedias, donde vive casi el 30 por ciento de
            los argentinos.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p>
            Su potencial estratégico es enorme. Los costos de infraestructura en este tipo de
            ciudades pueden ser hasta un 50 por ciento menores que en grandes aglomeraciones
            o en pequeños núcleos urbanos aislados, lo que las posiciona como actores clave
            para promover un sistema urbano más equilibrado en términos de distribución de
            población y oportunidades.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p>
            El perfil económico de estas ciudades es otro elemento que las distingue. En ellas
            conviven actividades productivas tradicionales con nuevas formas de desarrollo
            vinculadas al turismo, la educación superior, los servicios y el conocimiento.
            Esa combinación impulsa procesos de crecimiento sostenido y diversificado que las
            hace más resilientes frente a las crisis que suelen devastar a economías locales
            monoproductoras. Además, su escala urbana favorece la proximidad y el vínculo con
            el entorno natural, junto con procesos de expansión y planificación que las
            convierten en actores estratégicos para equilibrar la distribución de oportunidades
            en el territorio.
          </p>
        </FadeIn>
      </div>

      <div className="hr-editorial" />
    </section>
  )
}
