'use client'

import FadeIn from '@/components/ui/FadeIn'
import AnimatedCounter from '@/components/interactive/AnimatedCounter'

export default function NumbersSection() {
  return (
    <section className="section-padding bg-cream noise-overlay">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <FadeIn className="text-center mb-14 md:mb-20">
          <p className="text-xs uppercase tracking-[0.25em] text-sierra mb-4 font-body">
            Los datos
          </p>
          <h2 className="font-display text-section-title text-text-primary">
            Los números que hablan por sí solos
          </h2>
        </FadeIn>

        {/* Intro text */}
        <div className="prose-editorial !mb-14 md:!mb-20">
          <FadeIn>
            <p>
              El Censo 2022 registró 150.162 habitantes en Tandil, un 20,5 por ciento más que
              en 2010, por encima del promedio nacional para ese período. El economista Sebastián
              Auguste lo traduce en términos concretos y cotidianos: con esos números, el municipio
              tiene por día 5,8 personas nuevas para atender, lo que requiere al menos dos casas
              por día. Esa demanda constante y sostenida explica buena parte de la presión que el
              mercado inmobiliario local viene experimentando desde hace más de una década.
            </p>
          </FadeIn>
        </div>

        {/* Counters grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 max-w-5xl mx-auto mb-16 md:mb-20">
          <AnimatedCounter
            end={150162}
            label="Habitantes (2022)"
            colorClass="text-text-primary"
          />
          <AnimatedCounter
            end={20.5}
            suffix="%"
            prefix="+"
            decimals={1}
            label="Crecimiento intercensal"
            colorClass="text-sierra"
          />
          <AnimatedCounter
            end={5.8}
            decimals={1}
            label="Personas nuevas por día"
            colorClass="text-accent-data"
          />
          <AnimatedCounter
            end={2}
            prefix="~"
            label="Casas por día necesarias"
            colorClass="text-accent-warm"
          />
        </div>

        {/* Narrative text */}
        <div className="prose-editorial">
          <FadeIn>
            <p>
              Pero hay una dimensión del crecimiento que los censos todavía no han podido
              capturar en toda su magnitud. El último se realizó en 2022 y hay una percepción
              generalizada y consistente entre comerciantes, inmobiliarias, directivos de
              colegios y vecinos de que la pandemia aceleró un proceso que ya venía en marcha
              y que los números de los próximos años serán aún más llamativos.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p>
              Miles de trabajadores descubrieron que podían hacer su trabajo desde cualquier
              lugar con conexión a internet. Para muchos de ellos, ese lugar pasó a ser una
              casa con jardín en Tandil, con las sierras a diez minutos y con una calidad de
              vida que la Capital Federal difícilmente puede ofrecer a precios similares.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p>
              Los colegios de la ciudad vienen registrando incrementos de matrícula que exceden
              los proyectados. Los comercios del centro reportan un movimiento que no tiene
              precedentes en períodos fuera de temporada turística. Las inmobiliarias señalan
              que la demanda de propiedades para alquiler y compra supera con creces a la oferta
              disponible. Y los vecinos de barrios que hace diez años eran periféricos y
              silenciosos se encontraron de repente en medio de una ciudad que no para de
              densificarse a su alrededor.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="hr-editorial" />
    </section>
  )
}
