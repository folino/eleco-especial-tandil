'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FadeIn from '@/components/ui/FadeIn'
import PullQuote from '@/components/interactive/PullQuote'

gsap.registerPlugin(ScrollTrigger)

const timelineEvents = [
  { year: '2001', title: 'Crisis como catalizador', text: 'El Censo registra 108.109 habitantes. Durante la década siguiente, el crecimiento habitacional superará al poblacional. Desde 2002 se verifica un ingreso sostenido de inversiones y nuevos residentes.', accent: false },
  { year: '2003', title: 'Inicio de una era', text: 'Asume como intendente Miguel Ángel Lunghi, dando inicio a una etapa de continuidad política que facilita la implementación de una estrategia de desarrollo de largo plazo.', accent: false },
  { year: '2004–05', title: 'Posicionamiento estratégico', text: 'Se lanza la estrategia de internacionalización. Se crea el Instituto Mixto de Turismo y se establece el Plan de Desarrollo y Ordenamiento Territorial.', accent: false },
  { year: '2006', title: 'Integración regional', text: 'Tandil se integra a la red Mercociudades. Entre 2020 y 2021 llegará a ejercer la Presidencia de esa red de municipios sudamericanos.', accent: false },
  { year: '2009', title: 'Turismo sustentable', text: 'Se aprueba el Plan Estratégico Participativo de Turismo Sustentable. Se consolida la marca Tandil asociada al turismo natural serrano.', accent: false },
  { year: '2010', title: 'Hito censal y protección', text: 'El Censo registra 123.871 habitantes. Las sierras son declaradas Paisaje Protegido por la Ley provincial 14.126, que prohíbe la actividad de canteras.', accent: true },
  { year: '2014–20', title: 'Agenda ambiental', text: 'Recambio del alumbrado público a LED, Plan Crece con paneles solares, creación de USICOM Energías Renovables y Comunidad Solar I.', accent: false },
  { year: '2021', title: 'Producción e inserción global', text: 'Se lanza el Polo Productivo Social y se pone en marcha la primera Zona Aduanera en el Parque Industrial.', accent: false },
  { year: '2022', title: 'El Tandil de hoy', text: 'El Censo registra 150.162 habitantes, un crecimiento del 20,5% respecto de 2010. Los usuarios de energía eléctrica llegan a 69.118.', accent: true },
]

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const timelineContainerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current || !lineRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      gsap.set(lineRef.current, { scaleY: 1 })
      gsap.set('.timeline-item', { opacity: 1, x: 0 })
      return
    }

    // Animate the vertical line growing
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineContainerRef.current,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.5,
        },
      }
    )

    // Animate each timeline item
    const items = sectionRef.current.querySelectorAll('.timeline-item')
    items.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section-padding bg-section-light noise-overlay">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <FadeIn className="text-center mb-16 md:mb-20">
          <p className="text-xs uppercase tracking-[0.25em] text-sierra mb-4 font-body">
            Tres décadas de transformación
          </p>
          <h2 className="font-display text-section-title text-text-primary">
            De la Pampa al conocimiento
          </h2>
        </FadeIn>

        {/* Intro text before timeline */}
        <div className="prose-editorial !mb-14 md:!mb-20">
          <FadeIn>
            <p>
              Para entender el Tandil de hoy hay que remontarse, al menos, a los años noventa.
              Fue en esa década cuando comenzó a gestarse el cambio estructural que transformaría
              la ciudad de manera profunda e irreversible. Durante gran parte del siglo XX, Tandil
              fue un centro urbano estrechamente vinculado al agro y la industria. La producción
              de quesos y embutidos con denominación de origen, la actividad agropecuaria regional,
              la industria metalmecánica y los servicios básicos de una ciudad cabecera de partido
              definían su perfil productivo. Era una ciudad sólida, con identidad propia, pero
              cuya proyección nacional e internacional era limitada.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p>
              La crisis de 2001 operó, paradójicamente, como catalizador. Desde 2002 se verificó
              un ingreso sostenido de inversiones y nuevos residentes, fenómeno que reforzó la
              expansión inmobiliaria y la presión sobre el suelo. En 2003 asumió como intendente
              Miguel Ángel Lunghi, dando inicio a una etapa de continuidad política que atravesaría
              buena parte del período analizado y que facilitaría la implementación de una estrategia
              de desarrollo de largo plazo que combinó inversión en infraestructura, posicionamiento
              turístico y atracción de actividades económicas de mayor valor agregado.
            </p>
          </FadeIn>
        </div>

        {/* Timeline */}
        <div ref={timelineContainerRef} className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px">
            <div
              ref={lineRef}
              className="w-full h-full bg-sierra/30 origin-top"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          {/* Events */}
          <div className="space-y-8 md:space-y-12">
            {timelineEvents.map((event, i) => (
              <div
                key={i}
                className={`timeline-item opacity-0 relative grid md:grid-cols-2 gap-4 md:gap-8 ${
                  i % 2 === 0 ? '' : 'md:direction-rtl'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 top-1 w-3 h-3 -translate-x-[5px] md:-translate-x-[6px] rounded-full border-2 border-sierra bg-cream z-10">
                  {event.accent && (
                    <div className="absolute inset-[-4px] rounded-full border border-sierra/30 animate-ping"
                         style={{ animationDuration: '3s' }} />
                  )}
                </div>

                {/* Content */}
                <div className={`pl-10 md:pl-0 ${
                  i % 2 === 0
                    ? 'md:pr-12 md:text-right'
                    : 'md:col-start-2 md:pl-12 md:text-left'
                }`}>
                  <span className={`font-mono text-sm tracking-wide ${
                    event.accent ? 'text-sierra font-medium' : 'text-text-secondary'
                  }`}>
                    {event.year}
                  </span>
                  <h3 className={`font-display text-lg md:text-xl mt-1 mb-2 ${
                    event.accent ? 'text-sierra-dark' : 'text-text-primary'
                  }`}>
                    {event.title}
                  </h3>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed font-body"
                     style={{ direction: 'ltr' }}>
                    {event.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Post-timeline narrative */}
        <div className="prose-editorial !mt-14 md:!mt-20">
          <FadeIn>
            <p>
              El reposicionamiento estratégico fue el rasgo más visible de esos años. En 2004
              se lanzó la estrategia de internacionalización y comenzó a implementarse el Plan
              Federal de Construcción de Viviendas. En 2010 las sierras fueron declaradas Paisaje
              Protegido por la Ley provincial 14.126, que prohibió la actividad de canteras. Ese
              mismo año el crecimiento urbano avanzaba con fuerza hacia el sur y sudeste. La
              protección ambiental y la expansión inmobiliaria comenzaron a convivir en una
              relación tensa que aún hoy no se ha resuelto.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p>
              La articulación entre economía del conocimiento, producción local e inserción
              internacional fue delineando un nuevo horizonte para una ciudad que a mediados del
              siglo pasado miraba el mundo desde la producción de granos y ganado. La agenda
              ambiental y energética fue ganando centralidad en paralelo. Entre 2017 y 2022 la
              cantidad de usuarios de energía eléctrica pasó de 62.372 a 69.118, un indicador
              indirecto y elocuente del crecimiento sostenido que no para.
            </p>
          </FadeIn>
        </div>

        {/* Auguste quote */}
        <PullQuote author="Sebastián Auguste, economista e investigador">
          Tandil logró en las últimas tres décadas el cambio estructural de forma no traumática.
          Fue construyendo una nueva economía sobre los cimientos de la anterior, sin abandonar
          lo que funcionaba y agregando capas de complejidad que hoy le dan una solidez singular.
        </PullQuote>

        <div className="prose-editorial">
          <FadeIn>
            <p>
              Para el economista Sebastián Auguste, investigador y docente universitario
              especializado en desarrollo y dinámica económica local, el proceso tiene una
              característica que lo distingue de otros casos similares en el país. Mientras otras
              ciudades vivían crisis productivas devastadoras o perdían población ante la falta de
              oportunidades, esta comunidad fue construyendo una nueva economía sobre los cimientos
              de la anterior. Hoy, señala Auguste, la ciudad se apoya en una economía moderna
              basada en servicios, conocimiento y creatividad, integrada al mundo y organizada en
              clusters. A la par del polo tecnológico y universitario, mantienen peso el turismo
              y el agro, con potencial en segmentos de mayor valor agregado.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p>
              La UNICEN, universidad pública creada en 1974 con tres sedes regionales y con Tandil
              como sede central, es el motor silencioso de esa transformación. Su oferta académica
              abarca las facultades de Agronomía, Arte, Derecho, Económicas, Exactas, Humanas,
              Ingeniería, Salud, Sociales y Veterinaria. A ella se suma el Clúster Tecnológico
              como asociación empresarial y el ecosistema emprendedor local, conformando los
              actores fundamentales para el posicionamiento de Tandil como ciudad del conocimiento.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p>
              Tandil ya está en una senda muy saludable, asegura Auguste, aunque advierte que el
              desafío es sostener infraestructura, talento y calidad de vida para no cometer
              errores en una etapa clave de su desarrollo.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="hr-editorial" />
    </section>
  )
}
