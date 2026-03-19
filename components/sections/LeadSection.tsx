'use client'

import FadeIn from '@/components/ui/FadeIn'

export default function LeadSection() {
  return (
    <section className="section-padding bg-cream noise-overlay">
      <div className="prose-editorial">
        <FadeIn>
          <p className="text-body-lg text-text-primary leading-relaxed">
            Podría ser el sur de Francia. Podría ser una pequeña ciudad europea rodeada de
            colinas, senderos y miradores naturales. Pero es Tandil. O, mejor dicho, podrían
            ser ambas. Porque a más de diez mil kilómetros de distancia, nuestra ciudad comparte
            rasgos sorprendentes con Aubenas, una localidad del sureste francés.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p>
            Sin embargo algo las diferencia: el exponencial crecimiento poblacional y
            urbanístico. Hay una escena que se repite con sorprendente frecuencia en los últimos
            años. Una pareja, un profesional solo, una familia entera llega a Tandil por primera
            vez o después de varios años de ausencia. Lo que encuentra es una ciudad que creció,
            que se diversificó, que se densificó en algunos puntos y que se expandió hasta las
            mismas sierras. Una ciudad que, para bien y para mal, ya no es la misma de hace
            veinte años.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p>
            Ese proceso de transformación no es un accidente ni el resultado de una política
            pública extraordinaria. Es la expresión local de un fenómeno que atraviesa a
            decenas de urbes similares en toda la Argentina y en buena parte del mundo
            occidental. Tandil es hoy una ciudad intermedia en plena ebullición y su historia
            reciente resulta tan atractiva como reveladora.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p>
            Los números hablan por sí solos. Según el Censo 2022, la ciudad alcanzó los
            150.162 habitantes, un crecimiento del 20,5 por ciento respecto del Censo 2010,
            por encima del promedio nacional. La expansión urbana trepó al 77,2 por ciento en
            cuarenta años, duplicando el promedio del país. Y hay quienes advierten que lo que
            viene puede ser todavía más llamativo, porque la pandemia empujó un proceso que ya
            venía en marcha y que los próximos censos recién comenzarán a dimensionar.
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p>
            Para entender la magnitud de lo que está ocurriendo en esta ciudad de 4.935
            kilómetros cuadrados —que abarca el centro urbano y los pueblos aledaños de María
            Ignacia Vela, Gardey, Azucena, De La Canal, Fulton, Iraola, Desvío Aguirre y La
            Pastora, entre otros— hace falta recorrer la historia de las últimas décadas,
            entender el contexto en el que se inscribe el crecimiento y escuchar las voces de
            quienes eligieron este rincón serrano para hacer su vida.
          </p>
        </FadeIn>
      </div>

      <div className="hr-editorial" />
    </section>
  )
}
