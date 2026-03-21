'use client'

import FadeIn from '@/components/ui/FadeIn'

const profiles = [
  {
    name: 'Luli y Matt',
    subtitle: 'De Colorado a las sierras bonaerenses',
    text: [
      'Lucrecia «Luli» es de Mar del Plata y luego de conocer a Matt en un programa Work and Travel en Colorado, se casaron y vivieron años en destinos turísticos de Estados Unidos trabajando en hotelería y gastronomía, hasta que el crecimiento de sus hijos trajo el deseo de volver a los afectos, a la propia cultura, a otra escala de vida. La experiencia de una amiga ya instalada en Tandil les permitió observar una ciudad en expansión.',
    ],
    quote: 'Queríamos un lugar que no fuera tan grande como Mar del Plata pero que tampoco fuera demasiado chico. Acá podemos salir en bicicleta, estar cerca del cerro, organizar la vida familiar de otra manera y al mismo tiempo tener todo a mano.',
    placeholderGradient: 'from-amber-800/20 to-sierra/10',
    initial: 'L',
  },
  {
    name: 'Delfina y Mariano',
    subtitle: 'La tecnología como pasaporte a otro ritmo de vida',
    text: [
      'Ingenieros formados en la Universidad de Buenos Aires (UBA), con carreras consolidadas en el mundo tecnológico, hicieron un viaje casi casual a Tandil y algo hizo clic. Volvieron varias veces, investigaron, y la pandemia terminó de acelerar la decisión. A fines de 2022 se instalaron sin conocer a nadie.',
    ],
    quote: 'Desde lo informático se ve un desarrollo muy fuerte. Hay empresas que se están instalando y eso genera expectativas. Estamos felices. Casi todos los amigos que nos fuimos haciendo acá son de otros lugares.',
    placeholderGradient: 'from-blue-900/20 to-accent-data/10',
    initial: 'D',
  },
]

export default function StoriesSection() {
  return (
    <section className="section-padding bg-section-warm noise-overlay">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <FadeIn className="text-center mb-14 md:mb-20">
          <p className="text-xs uppercase tracking-[0.25em] text-sierra mb-4 font-body">
            Quienes eligieron Tandil
          </p>
          <h2 className="font-display text-section-title text-text-primary">
            Las historias detrás de los números
          </h2>
        </FadeIn>

        <div className="space-y-20 md:space-y-28 max-w-3xl mx-auto">
          {profiles.map((profile, i) => (
            <FadeIn key={i} y={60}>
              <article className="relative">
                {/* Profile header */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 mb-8">
                  {/* Photo placeholder */}
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br ${profile.placeholderGradient}
                                    flex items-center justify-center border border-sierra/10`}>
                      {/* TODO: Replace with real photo */}
                      <span className="font-display text-3xl md:text-4xl text-sierra/40">
                        {profile.initial}
                      </span>
                    </div>
                  </div>

                  {/* Name and subtitle */}
                  <div className="flex flex-col justify-center">
                    <h3 className="font-display text-2xl md:text-3xl text-text-primary">
                      {profile.name}
                    </h3>
                    <p className="text-sm md:text-base text-sierra font-body mt-1 italic">
                      {profile.subtitle}
                    </p>
                  </div>
                </div>

                {/* Body text */}
                <div className="space-y-5 mb-8">
                  {profile.text.map((paragraph, j) => (
                    <p key={j} className="text-body-lg text-text-primary leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="pull-quote !my-0">
                  <p className="!text-pull-quote !mb-0 !leading-relaxed">
                    {profile.quote}
                  </p>
                </blockquote>

                {/* Divider between profiles */}
                {i < profiles.length - 1 && (
                  <div className="hr-editorial !mt-16" />
                )}
              </article>
            </FadeIn>
          ))}
        </div>

        <div className="prose-editorial !mt-14 md:!mt-20">
          <FadeIn>
            <p>
              Miles de personas descubrieron que podían hacer su trabajo desde cualquier lugar
              con conexión a internet. Para muchos de ellos, ese lugar pasó a ser una casa con
              jardín en Tandil, con las sierras a diez minutos y con una calidad de vida soñada.
              Los colegios de la ciudad vienen registrando incrementos de matrícula que exceden
              los proyectados. Las inmobiliarias señalan que la demanda de propiedades para
              alquiler y compra supera con creces a la oferta disponible. Y los vecinos de
              barrios que hace diez años sostenían un ritmo tranquilo y silencioso se encontraron
              de repente en medio de una ciudad que no para de densificarse a su alrededor.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="hr-editorial" />
    </section>
  )
}
