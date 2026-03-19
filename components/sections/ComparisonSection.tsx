'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FadeIn from '@/components/ui/FadeIn'

gsap.registerPlugin(ScrollTrigger)

export default function ComparisonSection() {
  const lineRef = useRef<SVGLineElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useGSAP(() => {
    if (!lineRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReduced) {
      gsap.set(lineRef.current, { strokeDashoffset: 0 })
      return
    }

    const length = lineRef.current.getTotalLength()
    gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length })

    gsap.to(lineRef.current, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: svgRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    })
  })

  return (
    <section className="section-padding bg-cream noise-overlay">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <FadeIn className="text-center mb-10 md:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-sierra mb-4 font-body">
            Perspectiva global
          </p>
          <h2 className="font-display text-section-title text-text-primary">
            Dos ciudades, un mismo fenómeno
          </h2>
        </FadeIn>

        {/* Dual map visualization — simplified SVG globe */}
        <FadeIn className="max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="relative bg-section-light rounded-2xl p-6 md:p-10 border border-sierra/10">
            <svg
              ref={svgRef}
              viewBox="0 0 600 260"
              className="w-full h-auto"
              fill="none"
            >
              {/* Tandil dot */}
              <circle cx="170" cy="180" r="6" fill="#8B7355" />
              <circle cx="170" cy="180" r="12" fill="none" stroke="#8B7355" strokeWidth="1" opacity="0.3" />

              {/* Aubenas dot */}
              <circle cx="430" cy="80" r="6" fill="#8B7355" />
              <circle cx="430" cy="80" r="12" fill="none" stroke="#8B7355" strokeWidth="1" opacity="0.3" />

              {/* Connecting arc */}
              <line
                ref={lineRef}
                x1="176"
                y1="175"
                x2="424"
                y2="85"
                stroke="#8B7355"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.5"
              />

              {/* Labels */}
              <text x="170" y="210" textAnchor="middle" className="fill-text-primary font-display text-[14px]">
                Tandil
              </text>
              <text x="170" y="226" textAnchor="middle" className="fill-text-secondary text-[10px]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                Argentina · 37°S
              </text>

              <text x="430" y="56" textAnchor="middle" className="fill-text-primary font-display text-[14px]">
                Aubenas
              </text>
              <text x="430" y="72" textAnchor="middle" className="fill-text-secondary text-[10px]" style={{ fontFamily: 'Source Sans 3, sans-serif' }}>
                Francia · 44°N
              </text>

              {/* Distance annotation */}
              <text x="300" y="118" textAnchor="middle" className="fill-sierra text-[11px]" style={{ fontFamily: 'DM Mono, monospace' }}>
                +10.000 km
              </text>
            </svg>

            {/* Comparison traits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { trait: 'Paisaje serrano', desc: 'Ambas se desarrollaron rodeadas de colinas que condicionan la expansión urbana' },
                { trait: 'Territorio rural', desc: 'Identidades urbanas marcadas por su relación con el agro y la producción local' },
                { trait: 'Atracción de talento', desc: 'Estrategias para posicionarse como lugares atractivos para residir y emprender' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-sm font-display text-sierra-dark mb-1">{item.trait}</p>
                  <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Closing text */}
        <div className="max-w-prose-wide mx-auto">
          <FadeIn>
            <p className="text-body-lg text-text-primary leading-relaxed mb-6">
              A más de diez mil kilómetros de distancia, Tandil y Aubenas comparten rasgos 
              estructurales sorprendentes que van mucho más allá de la coincidencia geográfica. 
              Ambas ciudades se desarrollaron en estrecha relación con territorios rurales y 
              agropecuarios, consolidando identidades urbanas marcadas por el paisaje serrano.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-body-lg text-text-primary leading-relaxed mb-6">
              Tanto en Argentina como en Francia, estos centros han construido estrategias para 
              posicionarse como lugares atractivos para residir, emprender y desarrollar 
              actividades vinculadas al conocimiento, el turismo y la producción local. El 
              paisaje, la escala humana y la calidad ambiental aparecen en ambos casos como 
              factores que inciden en las decisiones de radicación.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-body-lg text-text-secondary leading-relaxed italic">
              Lo que ocurre en Tandil no es un fenómeno aislado sino parte de una tendencia que 
              está redefiniendo la geografía del desarrollo a escala global.
            </p>
          </FadeIn>
        </div>

        {/* Final editorial mark */}
        <FadeIn className="mt-16 md:mt-24 text-center">
          <div className="inline-block">
            <span className="block text-sierra/30 text-4xl font-display">◆</span>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
