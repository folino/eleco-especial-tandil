'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FadeIn from '@/components/ui/FadeIn'

gsap.registerPlugin(ScrollTrigger)

const conclusions = [
  {
    number: '01',
    title: 'Infraestructura desfasada',
    text: 'El crecimiento demográfico y constructivo no fue acompañado por infraestructura al mismo ritmo. La planta de efluentes saturada antes de tiempo y la red cloacal ajustada indican que la planificación quedó desfasada frente a la expansión urbana, aunque en los últimos años se ha notado un necesario avance.',
    accent: 'border-accent-alert/30',
    numberColor: 'text-accent-alert',
  },
  {
    number: '02',
    title: 'Más construcción ≠ más acceso',
    text: 'Aumentaron las viviendas y los metros cuadrados edificados, pero creció la dificultad habitacional y disminuyó la proporción de propietarios. Esto sugiere concentración del suelo y un mercado que produce ciudad pero no necesariamente integración.',
    accent: 'border-accent-warm/30',
    numberColor: 'text-accent-warm',
  },
  {
    number: '03',
    title: 'Herramientas sin ejecución plena',
    text: 'El Estado cuenta con herramientas pero no logra utilizarlas plenamente para orientar el modelo urbano. La baja utilización de la plusvalía y de instrumentos de gestión del suelo revela una capacidad limitada para conducir el proceso frente a la lógica del mercado.',
    accent: 'border-sierra/30',
    numberColor: 'text-sierra',
  },
]

export default function PivotSection() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!cardsRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const cards = cardsRef.current.querySelectorAll('.conclusion-card')

    if (prefersReduced) {
      cards.forEach(card => gsap.set(card, { opacity: 1, y: 0 }))
      return
    }

    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, { scope: cardsRef })

  return (
    <section className="section-padding bg-section-light noise-overlay">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <FadeIn className="text-center mb-10 md:mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-sierra mb-4 font-body">
            Encrucijada
          </p>
          <h2 className="font-display text-section-title text-text-primary mb-6">
            El momento bisagra
          </h2>
          <p className="text-lg text-text-secondary font-body max-w-2xl mx-auto leading-relaxed">
            La ciudad todavía está a tiempo de elegir un modelo claro.
            Compacto o disperso. Integrado o fragmentado. Con acceso público real a su
            patrimonio natural o con creciente privatización del paisaje serrano.
          </p>
        </FadeIn>

        {/* Narrative text */}
        <div className="prose-editorial !mb-14 md:!mb-20">
          <FadeIn>
            <p>
              Hoy es un momento bisagra. La expresión, usada por los propios analistas que
              estudian la ciudad, captura con precisión la naturaleza del instante que atraviesa.
              Su escala todavía permite planificar con anticipación, pero la velocidad del
              crecimiento la está empujando hacia un punto de no retorno. La ciudad todavía está
              a tiempo de elegir un modelo claro. Compacto o disperso, integrado o fragmentado,
              con acceso público real a su patrimonio natural o con creciente privatización del
              paisaje serrano que, siendo el principal activo ambiental e identitario de la
              ciudad, es mayoritariamente de propiedad privada y cuenta con escaso acceso público
              formal. Las sierras son exactamente lo que define a Tandil ante el mundo, y son
              exactamente el recurso al que amplios sectores de la propia población local no
              tienen garantizado el acceso.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p>
              En mayo de 2023 el Municipio publicó el informe Localización de la Agenda 2030 en
              el Partido de Tandil, que analiza cómo se integran los Objetivos de Desarrollo
              Sostenible en las políticas públicas locales. Entre los ejes aparecen la reducción
              de emisiones, el impulso de energías renovables, la gestión de residuos y la
              movilidad sustentable, con foco en la participación en redes internacionales como
              Mercociudades para fortalecer estrategias de desarrollo.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p>
              Del cruce de todos los datos se desprenden tres conclusiones estructurales que
              ningún actor local puede ignorar.
            </p>
          </FadeIn>
        </div>

        {/* Three conclusions */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16 md:mb-20">
          {conclusions.map((item, i) => (
            <div
              key={i}
              className={`conclusion-card opacity-0 bg-white rounded-xl p-6 md:p-8
                         border-l-4 ${item.accent} shadow-sm hover:shadow-md transition-shadow`}
            >
              <span className={`font-mono text-sm ${item.numberColor} tracking-wide`}>
                {item.number}
              </span>
              <h3 className="font-display text-lg md:text-xl text-text-primary mt-2 mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* CONICET positive counterpoint */}
        <FadeIn>
          <div className="max-w-prose-wide mx-auto bg-white/60 rounded-xl p-6 md:p-8 border border-sierra/10">
            <p className="text-xs uppercase tracking-[0.2em] text-sierra/60 mb-3 font-body">
              El contrapunto
            </p>
            <p className="text-body-lg text-text-primary leading-relaxed">
              El CONICET ubica a Tandil entre las ciudades intermedias con mejores niveles de
              calidad de vida de Argentina. En el informe "Calidad de vida en Argentina. Ranking
              del bienestar por departamentos". Ushuaia, Bariloche, Tandil y Carlos Paz son las
              mejores posicionadas por poseer como denominador común actividades económicas
              dinámicas, en muchos casos diversificadas.
            </p>
            <p className="mt-4 text-body-lg text-text-secondary leading-relaxed">
              Su posición geográfica estratégica, su bajo nivel relativo de conflictividad
              social, sus elevados niveles de participación ciudadana, su alto grado de
              articulación institucional y su creciente impulso emprendedor permiten un
              desarrollo económico y social armónico que la convirtió en referente regional y
              nacional. Son datos que la ciudad puede exhibir con legítimo orgullo.
            </p>
            <p className="mt-4 text-body-lg text-text-secondary leading-relaxed">
              Pero ese capital puede erosionarse si el crecimiento no se acompaña de
              planificación que garantice acceso equitativo a los bienes que hacen tan atractiva
              a esta ciudad. Las sierras, el aire limpio, la escala humana, la tranquilidad. Esos
              activos trajeron a Luli y Matt desde Colorado y a Delfina y Mariano desde Belgrano,
              y a muchos nuevos residentes más. Son los mismos activos que atraen inversiones y
              turistas semana a semana. Y son exactamente los activos que están en tensión. Si no
              hay planificación estratégica, el crecimiento continuará, pero consolidando
              desigualdades territoriales y tensionando la infraestructura existente.
            </p>
          </div>
        </FadeIn>
      </div>

      <div className="hr-editorial" />
    </section>
  )
}
