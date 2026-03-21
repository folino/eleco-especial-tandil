'use client'

import FadeIn from '@/components/ui/FadeIn'

const profiles = [
  {
    name: 'Luli y Matt',
    subtitle: 'De Colorado a las sierras bonaerenses',
    text: [
      'Luli es de Mar del Plata. Hace poco más de dos décadas viajó a Estados Unidos para participar de un programa de Work and Travel, sin imaginar que en Colorado conocería a Matt, con quien se casó en 2006 y formó una familia. Durante años vivieron en distintos destinos turísticos de ese país, vinculados al trabajo en hotelería y gastronomía, hasta que con el crecimiento de sus hijos comenzó a tomar forma la idea de regresar a la Argentina. La decisión estuvo atravesada por el deseo de recuperar la cercanía con los vínculos y con la propia cultura.',
      'Las visitas previas y la experiencia de una amiga marplatense que ya se había instalado en Tandil les permitieron observar un crecimiento sostenido y una oferta de servicios que consideraron adecuada para el proyecto familiar. La posibilidad de acceder a propuestas deportivas, educativas y culturales para sus hijos, junto con mayores oportunidades laborales vinculadas al turismo, terminó de inclinar la balanza. La vida al aire libre y la escala urbana fueron otros factores decisivos.',
      'Hoy, mientras proyectan construir su casa y consolidar nuevas redes, Luli sostiene que eligieron la ciudad por su calidad de vida y por el potencial que observan en su crecimiento. Una historia que se repite, con variaciones, en decenas de familias que llegaron desde Buenos Aires, desde otras provincias, desde el exterior.',
    ],
    quote: 'Nos sorprendió lo desarrollada que estaba y al mismo tiempo la tranquilidad que se respira. Queríamos un lugar que no fuera tan grande como Mar del Plata pero que tampoco fuera demasiado chico. Acá podemos salir en bicicleta, estar cerca del cerro, organizar la vida familiar de otra manera y al mismo tiempo tener todo a mano.',
    placeholderGradient: 'from-amber-800/20 to-sierra/10',
    initial: 'L',
  },
  {
    name: 'Delfina y Mariano',
    subtitle: 'La tecnología como pasaporte a otro ritmo de vida',
    text: [
      'Delfina y Mariano son de la Ciudad de Buenos Aires. Ella creció en Tigre y él en Almagro, pero la vida en común comenzó en Belgrano, después de conocerse en el ingreso a Ingeniería en la Universidad de Buenos Aires. Con el paso de los años, mientras desarrollaban sus carreras vinculadas al mundo tecnológico, empezó a surgir la inquietud de dejar el ritmo intenso de la capital y buscar un entorno más tranquilo.',
      'Un viaje casi casual a Tandil marcó el inicio de ese cambio. La ciudad los sorprendió por su paisaje serrano, su escala y las múltiples actividades que ofrecía. Volvieron varias veces y a medida que investigaban sobre la vida cotidiana y las posibilidades laborales, comenzaron a imaginarse viviendo allí. La pandemia terminó de acelerar la decisión. A fines de 2022 llegaron a Tandil sin conocer a nadie, con la convicción de que podían sostener sus trabajos de manera remota y proyectar una nueva etapa.',
      'La historia de Delfina y Mariano condensa, quizás mejor que cualquier análisis académico, el perfil del nuevo residente tandilense. Profesional, conectado al mundo digital, en busca de calidad de vida y dispuesto a apostar por una ciudad que ofrece algo que las grandes urbes hace tiempo dejaron de garantizar. Delfina admite entre risas que el invierno todavía representa un desafío. Pero el balance, sostienen, es ampliamente positivo.',
    ],
    quote: 'Desde lo informático se ve un desarrollo muy fuerte. Hay empresas que se están instalando y eso genera expectativas. Nuestros amigos son en su mayoría personas que también eligieron venir desde otros lugares, pero estamos felices de vivir acá.',
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
      </div>

      <div className="hr-editorial" />
    </section>
  )
}
