'use client'

import { useRef } from 'react'
import FadeIn from '@/components/ui/FadeIn'
import dynamic from 'next/dynamic'

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
          <p className="text-xs uppercase tracking-[0.25em] text-accent-warm/70 mb-4 font-body">
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
              <span className="block font-mono text-3xl md:text-4xl font-medium text-accent-warm tracking-tight">
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
              <span className="block font-mono text-3xl md:text-4xl font-medium text-accent-warm tracking-tight">
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
              <span className="block font-mono text-3xl md:text-4xl font-medium text-accent-warm tracking-tight">
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

        {/* Text content */}
        <div className="max-w-prose-wide mx-auto mb-14 md:mb-20">
          <FadeIn>
            <p className="text-body-lg text-white/70 mb-6 leading-relaxed">
              Si el crecimiento de la ciudad tiene una cara luminosa, también tiene una cara de
              sombra. Y esa cara es la que los especialistas en planificación urbana señalan con
              creciente preocupación cuando analizan lo que está ocurriendo en la ciudad. Tandil
              está creciendo más rápido de lo que logra ordenarse.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="text-body-lg text-white/70 mb-6 leading-relaxed">
              Como ciudad intermedia, vive una paradoja. Su escala todavía permitiría planificar
              con anticipación, pero la velocidad del crecimiento la está empujando hacia
              problemas propios de áreas metropolitanas mucho más grandes.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-body-lg text-white/70 mb-6 leading-relaxed">
              Los datos son elocuentes. La expansión urbana creció un 77,2 por ciento en los
              últimos 40 años, duplicando el promedio nacional del 35 por ciento según datos de
              MapBiomas. Entre 1970 y 2010 la mancha urbana se expandió de manera significativa,
              primero hacia el norte y luego, a partir de 1990, hacia las sierras.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-body-lg text-white/70 mb-6 leading-relaxed">
              La planta de tratamiento de efluentes diseñada para operar durante dos décadas
              llegó a su límite en un plazo considerablemente menor y hoy opera al máximo de su
              capacidad. En tanto que la proyección demográfica pensada a 20 años fue alcanzada
              en aproximadamente diez. Como buena noticia, entre 2005 y 2009 se ejecutaron 90
              kilómetros de red cloacal con una planta de capacidad de 8.000 metros cúbicos
              diarios. La planificación quedó desfasada frente a la velocidad del crecimiento,
              y esa brecha se expresa hoy en servicios tensionados y en una infraestructura que
              corre de atrás.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-body-lg text-white/70 mb-6 leading-relaxed">
              El Plan de Desarrollo Territorial (PDT) aprobado en 2005 buscaba orientar ese
              crecimiento hacia un modelo sostenible que promoviera la equidad social y la
              preservación del entorno natural. Sus estrategias incluían disminuir la
              concentración urbana, preservar los recursos naturales del cordón serrano,
              integrar la ciudad y mejorar el espacio público. Dos décadas después, el balance
              es mixto. Se consolidaron áreas productivas y se respetó en gran medida el
              crecimiento hacia el norte de la ciudad, tal como lo preveía el plan. Pero
              numerosos emprendimientos inmobiliarios, barrios cerrados y loteos se construyeron
              en zonas que el propio PDT había designado como áreas de protección ambiental.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="text-body-lg text-white/70 mb-6 leading-relaxed">
              El municipio nunca elaboró el Plan Especial de Manejo de las Sierras que la ley
              provincial exige como requisito fundamental para las zonas protegidas. Y persiste
              una deuda estructural en la definición clara de las áreas de crecimiento, lo que
              generó una expansión desordenada del valor de la tierra que beneficia a los
              propietarios originales sin que el Estado capture una porción de esa plusvalía para
              financiar infraestructura y servicios públicos.
            </p>
          </FadeIn>
        </div>

        

        {/* City divided text */}
        <div className="max-w-prose-wide mx-auto">
          <FadeIn>
            <p className="text-body-lg text-white/70 mb-6 leading-relaxed">
              El resultado más visible de ese proceso desordenado es la ciudad partida. La
              Ruta 226 y las vías del ferrocarril actúan como barreras físicas que fragmentan
              el tejido urbano y refuerzan las desigualdades territoriales.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="text-body-lg text-white/70 mb-6 leading-relaxed">
              Coexisten dos Tandiles. Uno con servicios, infraestructura consolidada y acceso
              pleno a los bienes que la ciudad ofrece. Otro con carencias estructurales en agua,
              cloacas, gas, pavimento y pluviales. La falta de planes directores para
              infraestructura básica es un problema que los vecinos de las zonas más postergadas
              sienten en carne propia cada vez que llueve fuerte o cuando no tienen agua en la
              canilla.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-body-lg text-white/70 mb-6 leading-relaxed">
              Para atender la fragmentación física, se viene discutiendo un bypass ferroviario
              de aproximadamente nueve kilómetros que libere el actual trazado y permita generar
              un corredor verde que conecte distintas zonas de la ciudad. La propuesta es
              atractiva, pero su implementación requiere inversión y coordinación entre distintos
              niveles del Estado.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-body-lg text-white/70 mb-6 leading-relaxed">
              La contracara social del boom es igualmente preocupante. Según el Censo 2022,
              Tandil encabeza en la provincia de Buenos Aires el indicador de dificultad
              habitacional. Entre todas las ciudades bonaerenses, registra el mayor porcentaje
              de hogares con problemas para acceder a una vivienda adecuada. Por otro lado, la
              proporción de hogares inquilinos casi se duplicó entre 2001 y 2018, del 15,5 al
              30 por ciento, en simultáneo con un crecimiento del 24,85 por ciento en la
              cantidad total de viviendas. Más construcción, más demanda insatisfecha, menos
              propietarios. Es la ecuación de un mercado que produce ciudad para quienes tienen
              capital, no necesariamente para quienes la habitan y la necesitan.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-body-lg text-white/70 mb-6 leading-relaxed">
              En 2022 se identificaron doce barrios populares en Tandil con un total de 1.328
              familias, la mayoría surgidos en las últimas dos décadas, sin acceso a agua
              corriente, red cloacal ni gas natural.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="text-body-lg text-white/70 mb-6 leading-relaxed">
              La gestión municipal tuvo posturas variadas frente a las ocupaciones de tierras
              que dieron origen a varios de estos barrios. En algunos casos, como el barrio
              Darío Santillán que comenzó a formarse en 2011 en terrenos fiscales, se toleraron
              las ocupaciones y se avanzó en la regularización dominial. En otros, como Villa
              Cordobita en 2015 y el asentamiento Palermo en 2020, hubo desalojos o
              negociaciones para evitar la consolidación. En 2021 La Secretaría de Integración
              Socio Urbana (SISU) aprobó dos proyectos de integración para barrios populares y
              ese mismo año comenzó la construcción de una cisterna en el barrio Movediza II.
              En 2022 se aprobó un plan de mejoramiento barrial para Tarraubella. Avances
              reales, aunque todavía no terminan de estar a la altura del problema.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
