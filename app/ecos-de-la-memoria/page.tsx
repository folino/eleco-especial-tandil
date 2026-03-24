'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import './ecos.css'

const BASE = '/ecos-de-la-memoria-tandil'

const TOC_ITEMS = [
  { label: 'Inicio',          target: 'hero' },
  { label: 'El golpe',        target: 'golpe' },
  { label: 'Tassara',         target: 'tassara' },
  { label: 'Martignoni',      target: 'martignoni' },
  { label: 'Dipaola',         target: 'dipaola' },
  { label: 'Elichiribehety',  target: 'elichiribehety' },
  { label: 'Lalloz',          target: 'lalloz' },
  { label: 'El barrio',       target: 'barrio' },
  { label: 'Marzocca',        target: 'marzocca' },
  { label: 'Traficante',      target: 'traficante' },
  { label: 'Fernández',       target: 'fernandez' },
  { label: 'Juicios',         target: 'juicios' },
]

type Lightbox = { src: string; alt: string } | null

export default function EcosDelaMemoria() {
  const [shareOk, setShareOk] = useState(false)
  const [lightbox, setLightbox] = useState<Lightbox>(null)

  const openLightbox = (src: string, alt: string) => setLightbox({ src, alt })
  const closeLightbox = () => setLightbox(null)

  /* ── Lightbox — cerrar con Escape ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* ── Ocultar header raíz y ajustar body ── */
  useEffect(() => {
    document.body.classList.add('ecos-special')
    return () => document.body.classList.remove('ecos-special')
  }, [])

  /* ── Progress bar ── */
  useEffect(() => {
    const bar = document.getElementById('ecos-progress')
    const onScroll = () => {
      if (!bar) return
      const pct =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100
      bar.style.width = pct + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Nav blur ── */
  useEffect(() => {
    const nav = document.getElementById('ecos-nav')
    const onScroll = () =>
      nav?.classList.toggle('scrolled', window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Back to top visibility ── */
  useEffect(() => {
    const btn = document.getElementById('ecos-share')
    const onScroll = () =>
      btn?.classList.toggle('visible', window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── TOC ── */
  useEffect(() => {
    const toc = document.getElementById('ecos-toc')
    const dots = Array.from(
      document.querySelectorAll<HTMLElement>('#ecos-toc .toc-dot')
    )
    const map = dots
      .map((dot) => ({ dot, section: document.getElementById(dot.dataset.target ?? '') }))
      .filter((s) => s.section) as { dot: HTMLElement; section: HTMLElement }[]

    dots.forEach((dot) => {
      const sec = document.getElementById(dot.dataset.target ?? '')
      dot.addEventListener('click', () => sec?.scrollIntoView({ behavior: 'smooth' }))
    })

    const onScroll = () => {
      const y = window.scrollY + window.innerHeight / 3
      toc?.classList.toggle('visible', window.scrollY > 400)
      let current = map[0]
      for (const s of map) {
        if (s.section.offsetTop <= y) current = s
      }
      dots.forEach((d) => d.classList.remove('active'))
      current?.dot.classList.add('active')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Fade-in on scroll ── */
  useEffect(() => {
    const els = document.querySelectorAll('.ecos-page .fade-in')
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  /* ── Share handler ── */
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ecos de la Memoria en Tandil — El Eco de Tandil',
          text: 'A 50 años del golpe cívico-militar, un recorrido por las heridas, los silencios y las resistencias en Tandil.',
          url: window.location.href,
        })
      } catch (_) {}
    } else {
      await navigator.clipboard.writeText(window.location.href)
      setShareOk(true)
      setTimeout(() => setShareOk(false), 2000)
    }
  }

  return (
    <div className="ecos-page">
      {/* ── Progress Bar ── */}
      <div className="progress" id="ecos-progress" />

      {/* ── Nav ── */}
      <nav className="nav" id="ecos-nav">
        <a href="https://eleco.com.ar" className="nav-logo">El Eco de Tandil</a>
        <div className="nav-right">
          <span className="nav-label">Especial · 24 de Marzo</span>
          <button
            className="nav-share"
            onClick={handleShare}
            aria-label="Compartir"
            title="Compartir"
          >
            {shareOk ? (
              <span className="nav-share-ok">✓</span>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ── TOC ── */}
      <div className="toc" id="ecos-toc">
        {TOC_ITEMS.map((item) => (
          <div
            key={item.target}
            className="toc-dot"
            data-label={item.label}
            data-target={item.target}
          />
        ))}
      </div>

      {/* ── Back to Top ── */}
      <button
        className="top-btn"
        id="ecos-share"
        title="Volver al inicio"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver al inicio"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      {/* ════════════════════════════════
          HERO
         ════════════════════════════════ */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <Image
            src={`${BASE}/documental_24m.webp`}
            alt="Portada — Ecos de la Memoria en Tandil"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="100vw"
            priority
          />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            Ecos de <em>la Memoria</em>
            <br />en Tandil
          </h1>
          <p className="hero-subtitle">
            A 50 años del 24 de Marzo de 1976
          </p>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ════════════════════════════════
          STATS
         ════════════════════════════════ */}
      <div className="stats-bar fade-in">
        <div className="stat">
          <div className="stat-number">37</div>
          <div className="stat-label">
            Personas desaparecidas<br />en Tandil
          </div>
        </div>
        <div className="stat">
          <div className="stat-number">2</div>
          <div className="stat-label">
            Bebés nacidos en cautiverio<br />aún buscados
          </div>
        </div>
        <div className="stat">
          <div className="stat-number">50</div>
          <div className="stat-label">
            Años de búsqueda<br />de verdad y justicia
          </div>
        </div>
        <div className="stat">
          <div className="stat-number">8</div>
          <div className="stat-label">
            Condenados en el<br />juicio La Huerta
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          INTRO
         ════════════════════════════════ */}
      <section className="intro fade-in">
        <p>
          A 50 años del 24 de marzo de 1976, la sociedad argentina puede saber gran parte de lo
          que ocurrió durante la dictadura cívico-militar: terrorismo de Estado, desapariciones,
          robo de bebés y la implementación de un plan económico que provocó una profunda
          desindustrialización del país mientras multiplicó por seis la deuda externa.
        </p>
        <p>
          Y aunque muchos de los relatos sobre lo que pasó a partir del golpe suelen hacer foco
          en los grandes centros urbanos, en las ciudades más pequeñas e intermedias, la dictadura
          también sucedió.
        </p>
        <p>
          Historias atravesadas por ausencias, treinta y siete personas desaparecidas, dos niños/as
          que deberían haber nacido en cautiverio y a los que aún se busca, personas secuestradas
          y torturadas, severas consecuencias en el plano económico e industrial, censura, miedo,
          indiferencia.
        </p>
        <p>
          Desde las voces de vecinos sobrevivientes, testigos y protagonistas de aquella época,
          este especial de El Eco de Tandil busca acercarse a responder una pregunta:{' '}
          <strong>¿Cómo se vivió la dictadura en Tandil?</strong>
        </p>
      </section>

      <div className="divider">
        <div className="divider-line" />
        <div className="divider-symbol">✦</div>
        <div className="divider-line" />
      </div>

      {/* ════════════════════════════════
          CAPÍTULO I — EL GOLPE
         ════════════════════════════════ */}
      <section className="testimony" id="golpe">
        <div className="testimony-header fade-in">
          <div>
            <h2 className="testimony-title">
              El día que <em>apagaron la luz</em>
            </h2>
          </div>
          <div className="testimony-who">
            <strong>Tandil, 24 de marzo de 1976</strong>
            La cúpula militar se presenta en la Municipalidad y destituye al intendente electo.
          </div>
        </div>
        <div className="testimony-body">
          <div className="testimony-image portrait">
            <Image
              src={`${BASE}/zanatelli.webp`}
              alt="Coronel Juan Domingo Zanatelli, interventor de Tandil tras el golpe del 24 de marzo de 1976"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              sizes="100vw"
            />
          </div>
          <div className="testimony-text fade-in">
            <p>
              El miércoles 24 de marzo de 1976, la cúpula militar local se presentó en la
              Municipalidad de Tandil y le pidió a Jorge Lester, el intendente que tres años atrás
              había asumido el poder comunal, que entregara el mando y se retirara junto a sus
              funcionarios. Ante lo inevitable, eligieron irse sin oponer resistencia. Esa mañana,
              como tantas otras, los niños concurrieron a las escuelas y los adultos a sus trabajos.
              Las maestras daban la noticia de que las clases se suspendían. "Vuelvan rápido a sus
              casas", se escuchó en las aulas. La calle en silencio, los alumnos en silencio, la
              ciudad en silencio.
            </p>
            <p>
              El jueves 25 de marzo de 1976, El Eco de Tandil tituló en la portada "Sin resistencia
              alguna cayó el gobierno de Isabel Perón", junto a una imagen de Jorge Rafael Videla. En
              la sección de noticias locales, informó que "El teniente coronel J.J. Zanatelli se hizo
              cargo de la Comuna". Más abajo, una fotografía del frente de la Municipalidad con
              "apenas un vehículo militar estacionado". También se destacó el clima de tranquilidad
              que se vivió en el Palacio Comunal tras el ingreso militar.
            </p>
            <p>
              A los pocos días del golpe, Zanatelli se institucionalizó como Intendente, cargo en el
              que estuvo hasta el 2 de julio de 1976, cuando fue relevado por el civil Adolfo
              Fernández Trinchero, gerente del Banco Comercial y figura representativa del gran
              empresariado local. En 1979, Zanatelli volvió a ocupar el sillón de Dufau, cargo que
              mantuvo hasta 1983 cuando, en la apertura democrática, ganó las elecciones el radical
              Américo Reynoso. Como sucedió en otros distritos, Julio José Zanatelli regresó a la
              Intendencia en 1991 tras ser electo por el pueblo. Su gestión fue ratificada dos veces
              en las urnas y gobernó la ciudad hasta principios de 2002, cuando renunció por
              problemas de salud.
            </p>
            <div className="pullquote">
              <blockquote>
                Una pregunta resuena y horada el imaginario colectivo: ¿Hasta dónde llegó en Tandil
                la participación de los distintos sectores civiles y eclesiásticos en la dictadura?
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      
      {/* ════════════════════════════════
          CAPÍTULO II — TASSARA
         ════════════════════════════════ */}
      <section className="testimony" id="tassara">
        <div className="testimony-header fade-in">
          <div>
            <h2 className="testimony-title">
              "Pensábamos que era <em>un golpe más"</em>
            </h2>
          </div>
          <div className="testimony-who">
            <strong>Roberto Tassara</strong>
            Contador público y ex Rector de la UNICEN
          </div>
        </div>
        <div className="testimony-body">
          <div className="testimony-image wide">
            <Image
              src={`${BASE}/documental_24m_1.webp`}
              alt="Roberto Tassara"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              sizes="100vw"
            />
          </div>
          <div className="testimony-text fade-in">
            <p>
              Roberto Tassara, contador público y exRector de la Unicen, estaba en su departamento,
              a pocas cuadras de la universidad y del estudio contable donde trabajaba, cuando se
              enteró del golpe de Estado del 24 de marzo de 1976. La noticia le llegó, como a la
              mayoría en ese tiempo, a través de la radio. No era la primera vez que vivía una
              interrupción institucional. En ese momento lo pensó como una continuidad: un nuevo
              golpe cívico-militar, como los anteriores.
            </p>
            <p>
              Tras escuchar la noticia, salió a la calle. Caminó hasta el estudio donde trabajaba y
              desde allí se dirigieron a la sede de la Universidad Nacional del Centro, en pleno
              centro de la ciudad. Tassara era nodocente, se desempeñaba como director general de
              Presupuesto y además tenía una dedicación simple como docente. Al llegar, encontró que
              el rector había sido reemplazado por un interventor militar.
            </p>
            <p>
              Con el paso de los días, comenzaron a aparecer señales perturbadoras. Una de ellas fue
              la visita de la familia de una excompañera de estudios, que había sido detenida en
              Benito Juárez sin que se supiera su paradero. Tassara y otros colegas intentaron
              averiguar qué había sucedido. Lograron entrevistarse con un militar que les confirmó
              que la joven estaba detenida en Sierra Chica. "La tenemos nosotros", les dijo, y agregó
              que la joven había sido inteligente en no mencionarlos, caso contrario debería haberlos
              llamado para "hablar".
            </p>
            <div className="pullquote">
              <blockquote>
                Hoy parece impensado, pero se sabía poco.
              </blockquote>
              <cite>Roberto Tassara</cite>
            </div>
            <p>
              Esa misma jornada, atravesado por la incertidumbre, tomó una decisión que le quedó
              grabada: al regresar a su departamento, reunió revistas, libros y materiales vinculados
              a la Unión Soviética —que había heredado de su padre comunista y que incluía información
              sobre ajedrez— y al pensamiento marxista, y los arrojó al incinerador del edificio. Fue
              un gesto de autoprotección, motivado por el temor a posibles represalias.
            </p>
            <p>
              Como miembro del Consejo Profesional de Ciencias Económicas, fue convocado a formar
              parte de la Cotac, una comisión civil de asesoramiento al gobierno de facto, integrada
              por representantes de la Asociación de la Pequeña y Mediana Industria Metalúrgica, la
              Cámara Comercial e Industrial, la Sociedad Rural, la Asociación de Abogados, el Colegio
              de Médicos, el Centro Profesional de la Ingeniería, el Círculo de Veterinarios, el
              Colegio de Escribanos, el Consejo Profesional de Ciencias Económicas y dos miembros de
              las Fuerzas Armadas.
            </p>
            <div className="pullquote">
              <blockquote>
                Lo que me llevó a tomar esa decisión fue que advertí que, de algún modo, se intentaba
                reemplazar al Concejo Deliberante: como si ciertos grupos sociales de Tandil
                pudiéramos definir, al menos en lo económico, el destino de la ciudad. Ante eso,
                decidí apartarme.
              </blockquote>
              <cite>Roberto Tassara</cite>
            </div>
            <p>
              La Cotac funcionó por lo menos hasta 1977 y tuvo injerencia en el destino del matadero
              municipal, que terminó cerrando sus puertas, en tanto se puso en marcha uno privado.
            </p>
          </div>
        </div>
      </section>

      <div
        className="full-image-break lightbox-trigger"
        onClick={() => openLightbox(`${BASE}/desaparecidos_tandil.webp`, 'Desaparecidos de Tandil')}
        role="button"
        tabIndex={0}
        aria-label="Ver imagen ampliada"
      >
        <Image
          src={`${BASE}/desaparecidos_tandil.webp`}
          alt="Desaparecidos de Tandil"
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
      </div>


      {/* ════════════════════════════════
          CAPÍTULO III — MARTIGNONI
         ════════════════════════════════ */}
      <section className="testimony" id="martignoni">
        <div className="testimony-header fade-in">
          <div>
            <h2 className="testimony-title">
              Los libros <em>como armas</em>
            </h2>
          </div>
          <div className="testimony-who">
            <strong>Alicia Martignoni</strong>
            Docente durante 40 años, regente del ISFD y T N°10, fundadora de la Sala Abierta de
            Lectura
          </div>
        </div>
        <div className="testimony-body">
          <div className="testimony-image">
            <Image
              src={`${BASE}/documental_24m_6.webp`}
              alt="Alicia Martignoni"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          <div className="testimony-text fade-in">
            <p>
              El nombre de Alicia Martignoni está indefectiblemente ligado a la educación tandilense.
              Ejerció 40 años como docente, fue regente del Instituto Superior de Formación Docente y
              Técnica 10 y fundó en la década del 80 la Sala Abierta de Lectura. En diálogo con El
              Eco de Tandil recordó con nitidez el clima previo al golpe de Estado, no desde la
              sorpresa sino desde una certeza inquietante: la de haber sabido, incluso antes del 24
              de marzo de 1976, que una etapa oscura se avecinaba.
            </p>
            <p>
              "Yo estaba estudiando en Buenos Aires cuando cerraron la Facultad de Filosofía y Letras,
              durante el gobierno de Isabel. Ahí decidimos con mi marido venirnos a Tandil, casarnos y
              quedarnos. Teníamos miedo", contó. Pero el contexto ya era otro: compañeros que
              desaparecían, listas negras, allanamientos.
            </p>
            <div className="pullquote">
              <blockquote>
                Estábamos muy asustados. Sí, ese día estábamos por poco debajo de la cama, porque
                estábamos con mi marido, yo recién me había casado el 23 de enero del 76, y nosotros
                sí sabíamos que estaban desapareciendo compañeros ya desde hacía por lo menos un año,
                otros compañeros y compañeras que aún viven estaban presos por el accionar contra la
                llamada subversión y estaban desapareciendo muchos compañeros. A diferencia de lo que
                muchos dicen hoy, nosotros sabíamos que era una desgracia lo que venía.
              </blockquote>
              <cite>Alicia Martignoni</cite>
            </div>
            <p>
              En el ámbito educativo, la dictadura también dejó su marca. Alicia había participado en
              la elaboración de diseños curriculares en los años previos. Después vino una depuración.
              Decían que había "ideologías extrañas". Hasta Piaget era subversivo. En ese contexto
              apareció un decreto del ministro de Educación de la dictadura que prohibía pedir libros
              en las escuelas. "Lo vivimos como una afrenta", recordó.
            </p>
            <p>
              Esa prohibición, lejos de inmovilizarlas, generó una reacción. Junto a otras docentes,
              impulsó la creación de bibliotecas escolares y, más adelante, proyectos como el Club de
              Narradores y la Sala Abierta de Lectura.
            </p>
            <div className="pullquote">
              <blockquote>
                Analizando los datos, contando lo que pasó, mucha gente vuelve a pensar. Yo tengo fe
                en eso.
              </blockquote>
              <cite>Alicia Martignoni</cite>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CAPÍTULO IV — DIPAOLA
         ════════════════════════════════ */}
      <section className="testimony" id="dipaola">
        <div className="testimony-header fade-in">
          <div>
            <h2 className="testimony-title">
              La dictadura <em>desde los medios</em>
            </h2>
          </div>
          <div className="testimony-who">
            <strong>Néstor Dipaola</strong>
            Periodista y escritor, trabajó en El Eco de Tandil desde 1968
          </div>
        </div>
        <div className="testimony-body">
          <div className="testimony-image">
            <Image
              src={`${BASE}/documental_24m_5.webp`}
              alt="Néstor Dipaola"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          <div className="testimony-text fade-in">
            <p>
              "Soy Néstor Dipaola y ya para ese entonces, el 24 de marzo del 76, yo estaba trabajando
              en este diario, El Eco de Tandil, desde ocho años atrás", comenzó la entrevista el
              entrañable periodista y escritor. Aquella mañana se encontraba en la universidad y
              decidió acercarse al "Bar Ideal", un espacio de encuentro de la dirigencia política
              local. Entre los presentes había posiciones diversas, incluso algunas favorables al
              golpe.
            </p>
            <p>
              En relación con su trabajo periodístico, en esos años se desempeñaba en la sección
              Deportes, por lo que no tenía una participación directa en la cobertura política del
              diario. Decidió permanecer en esa sección para poder seguir escribiendo y opinando,
              algo que en otras áreas estaba vedado.
            </p>
            <div className="pullquote">
              <blockquote>
                Muy rápidamente nos dimos cuenta de que había una censura encubierta y a veces no
                tan encubierta.
              </blockquote>
              <cite>Néstor Dipaola</cite>
            </div>
            <p>
              Relató dos episodios que evidenciaron el funcionamiento de la censura. El primero
              ocurrió hacia 1977, durante la organización de un desfile militar en Tandil. Tras una
              conferencia de prensa, un coronel dio una orden explícita: "Y quiero ver mañana en las
              páginas de los diarios por lo menos una página o dos completas sobre esta información.
              Y quiero ver fotos, fotos bien grandes".
            </p>
            <p>
              El segundo episodio se vinculó con la cobertura del otorgamiento del Premio Nobel de
              la Paz a Adolfo Pérez Esquivel. A través de los teletipos de la agencia oficial Télam,
              llegó una directiva clara: "Se recomienda a los señores editorialistas brindar escasa
              importancia a esta información".
            </p>
            <p>
              No es un detalle menor que Juan Manuel Calvo, entonces director de El Eco de Tandil,
              tendría dos hijas desaparecidas, pero Dipaola expuso que jamás se publicó ni como
              información ni como nada en las páginas del diario.
            </p>
            <div className="pullquote">
              <blockquote>
                Había bastante gente y la mitad, o tal vez un poco más de la mitad, aplaudiendo a
                gritos, aprobando el gobierno de Videla.
              </blockquote>
              <cite>Néstor Dipaola, sobre la visita de Videla a Tandil</cite>
            </div>
          </div>
        </div>
      </section>

      <div className="image-collage left-wide">
        <div
          className="image-collage-item lightbox-trigger"
          onClick={() => openLightbox(`${BASE}/archivo_dictadura_1.webp`, 'Archivo — dictadura en Tandil')}
          role="button" tabIndex={0} aria-label="Ver imagen ampliada"
        >
          <Image
            src={`${BASE}/archivo_dictadura_1.webp`}
            alt="Archivo — dictadura en Tandil"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 66vw"
          />
        </div>
        <div
          className="image-collage-item lightbox-trigger"
          onClick={() => openLightbox(`${BASE}/archivo_dictadura_2.webp`, 'Archivo — dictadura en Tandil')}
          role="button" tabIndex={0} aria-label="Ver imagen ampliada"
        >
          <Image
            src={`${BASE}/archivo_dictadura_2.webp`}
            alt="Archivo — dictadura en Tandil"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 34vw"
          />
        </div>
      </div>

      {/* ════════════════════════════════
          CAPÍTULO V — ELICHIRIBEHETY
         ════════════════════════════════ */}
      <section className="testimony" id="elichiribehety">
        <div className="testimony-header fade-in">
          <div>
            <h2 className="testimony-title">
              "Una mirada <em>laxa"</em>
            </h2>
          </div>
          <div className="testimony-who">
            <strong>Julio Elichiribehety</strong>
            Dirigente de la UCR local
          </div>
        </div>
        <div className="testimony-body">
          <div className="testimony-image wide">
            <Image
              src={`${BASE}/documental_24m_3.webp`}
              alt="Julio Elichiribehety"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              sizes="100vw"
            />
          </div>
          <div className="testimony-text fade-in">
            <p>
              Julio Elichiribehety reconstruyó sus recuerdos desde una experiencia atravesada por
              la juventud, la distancia inicial con la política y una comprensión que, según contó,
              se fue profundizando con el paso del tiempo. Tenía poco más de veinte años y aún no
              había votado. "Voté por primera vez a los 29 años", recordó.
            </p>
            <p>
              Aquel día lo sorprendió en un contexto que ya anticipaba una ruptura institucional.
              "Había un clima previo, una percepción de que podía haber algún tipo de interrupción
              institucional". En su mirada retrospectiva, insistió en que estos procesos no fueron
              hechos aislados: "Los golpes de Estado no son producto de un hecho mesiánico, sino que
              son planificados, pensados, y han tenido adhesión de sectores de la sociedad".
            </p>
            <p>
              En relación con Tandil, que por entonces contaba con poco más de 70 mil habitantes,
              describió una ciudad con un clima particular.
            </p>
            <div className="pullquote">
              <blockquote>
                No es que no pasaba nada, pero había una mirada un tanto laxa sobre los temas.
              </blockquote>
              <cite>Julio Elichiribehety</cite>
            </div>
            <p>
              Durante los primeros años de la dictadura predominó una especie de silencio social.
              "Había como una demanda subterránea, por debajo de la media", explicó. Remarcó que los
              abogados Victorino y Juan Carlos Pugliese (h), Pedersoli y Gutiérrez se animaron a
              presentar hábeas corpus para conocer el destino de las personas secuestradas.
            </p>
            <p>
              El punto de inflexión en su vida política llegó con la recuperación democrática y la
              figura de Raúl Alfonsín. Ya en democracia, su participación en organismos de derechos
              humanos lo llevó a involucrarse en discusiones locales sobre el pasado reciente.
            </p>
            <div className="pullquote">
              <blockquote>
                Eso refleja un perfil, lo que algunos llaman el votante del orden.
              </blockquote>
              <cite>Julio Elichiribehety, sobre la cultura política local</cite>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CAPÍTULO VI — LALLOZ
         ════════════════════════════════ */}
      <section className="testimony" id="lalloz">
        <div className="testimony-header fade-in">
          <div>
            <h2 className="testimony-title">
              El impacto <em>en la industria</em>
            </h2>
          </div>
          <div className="testimony-who">
            <strong>Enrique Lalloz</strong>
            Ingeniero metalúrgico, 30 años en Metalúrgica Tandil
          </div>
        </div>
        <div className="testimony-body">
          <div className="testimony-image wide">
            <Image
              src={`${BASE}/documental_24m_8.webp`}
              alt="Enrique Lalloz"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              sizes="100vw"
            />
          </div>
          <div className="testimony-text fade-in">
            <p>
              En 1974, Enrique Lalloz empezó a consolidar una trayectoria en la industria local.
              Ingeniero metalúrgico, se desempeñó durante más de 30 años en Metalúrgica Tandil,
              donde llegó a ser gerente. Su recuerdo de aquellos años no se centra en un hecho
              puntual, sino en un proceso que, con el tiempo, marcaría un quiebre profundo en la
              actividad productiva local.
            </p>
            <div className="pullquote">
              <blockquote>
                Era una empresa emblemática, no solo a nivel nacional sino regional. Trabajábamos
                para todas las automotrices: General Motors, Mercedes-Benz, Renault, Fiat. Era un
                volumen muy alto de producción.
              </blockquote>
              <cite>Enrique Lalloz</cite>
            </div>
            <p>
              Sin embargo, ese escenario comenzó a cambiar rápidamente. Con la política económica
              de Martínez de Hoz, empezó una desindustrialización muy fuerte. Se abrió la
              importación masiva e indiscriminada y muchas actividades empezaron a sucumbir. Cayó
              el 30 por ciento de la producción de Metalúrgica Tandil por dejar de fabricar piezas
              para General Motors.
            </p>
            <p>
              El deterioro no fue solo productivo. "Metalúrgica también sufrió pérdidas humanas,
              desapariciones de personas. Es muy conmocionante ver que alguien desaparece del
              ámbito laboral y nunca más se sabe de él".
            </p>
            <div className="pullquote">
              <blockquote>
                Hoy ves galpones abandonados, actividad caída. Antes podíamos fabricar un motor
                entero y hoy no podemos hacer un bloc.
              </blockquote>
              <cite>Enrique Lalloz</cite>
            </div>
            <p>
              Cuando ingresó había unos 1.100 trabajadores. Después bajó a 800, a 600, y así fue
              cayendo hasta cifras mucho más bajas. "Metalúrgica Tandil" cerró definitivamente en
              2018.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          VIDEO DOCUMENTAL
         ════════════════════════════════ */}
      <div className="video-break fade-in">
        <div className="video-break-label">Documental</div>
        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/iIV8cV6-Ans?rel=0&modestbranding=1&color=white"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Documental — Ecos de la Memoria en Tandil"
          />
        </div>
      </div>

      {/* ════════════════════════════════
          CAPÍTULO VII — EL BARRIO
         ════════════════════════════════ */}
      <section className="testimony" id="barrio">
        <div className="testimony-header fade-in">
          <div>
            <h2 className="testimony-title">
              La vida <em>en los barrios</em>
            </h2>
          </div>
          <div className="testimony-who">
            <strong>Adriana Palacio y Juan de Dios González</strong>
            Vecinos del barrio Obrero (General Belgrano)
          </div>
        </div>
        <div className="testimony-body">
          <div className="testimony-image">
            <Image
              src={`${BASE}/documental_24m_7.webp`}
              alt="Adriana Palacio y Juan de Dios González, vecinos del barrio Obrero"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          <div className="testimony-text fade-in">
            <p>
              Desde el barrio Obrero —también conocido como barrio General Belgrano— Adriana Palacio
              y Juan de Dios González reconstruyeron sus memorias del 24 de marzo de 1976 y de los
              años que siguieron, atravesados por el miedo, la incertidumbre y la vida cotidiana
              alterada.
            </p>
            <p>
              Adriana evocó una escena precisa de ese día, cuando era adolescente y salía rumbo a la
              escuela. Fue a buscar a su prima y encontró la calle desierta. "Había dos soldados con
              armas largas que no nos dejaban pasar. 'Hoy no hay clase', nos dijeron. Y vos no te
              atrevías a decir nada más. Yo le miraba la cara y la tengo como si hubiera pasado ayer".
            </p>
            <div className="pullquote">
              <blockquote>
                Éramos pibes y no teníamos la información que hay hoy. De repente escuchabas cosas
                y después esos vecinos no estaban más. La casa con un cartel de venta. Una
                incertidumbre en el cuerpo, horrible.
              </blockquote>
              <cite>Adriana Palacio</cite>
            </div>
            <p>
              La vida en el barrio, marcado por su identidad trabajadora, también se vio golpeada.
              "Todos atravesados por gremios: mi papá municipal, al lado un metalúrgico. Y el miedo,
              porque te enterabas que entraban a las casas, que allanaban", contó Adriana.
            </p>
            <p>
              Juan de Dios agregó: "Ellos tenían que derribar toda forma de organización de base. Los
              gremios fueron intervenidos. Y eso iba debilitando todo, porque en las fábricas
              aparecían personas que no representaban a los trabajadores".
            </p>
            <div className="pullquote">
              <blockquote>
                Se prendieron todas las luces y entró la Policía. Nos llevaron a todos en un camión
                celular. Estuvimos toda la noche en la comisaría. Éramos menores. Una cosa espantosa.
              </blockquote>
              <cite>Adriana Palacio, sobre una noche en un local bailable</cite>
            </div>
            <p>
              En esa trama colectiva aparece una historia que ambos destacan como símbolo: la
              protección del busto de Eva Perón en la plaza del barrio. "Siempre se lo llevaban en
              cada dictadura. Y nosotros pensábamos que se lo había llevado la Policía pero no, lo
              tenían los vecinos", contó Adriana.
            </p>
            <p>
              "Lo guardaban en sus casas, en un placard, en un altillo. Y después lo volvían a poner.
              Siempre. El barrio lo resguardó en cada dictadura", completó Juan de Dios. Hoy todavía
              se hacen homenajes todos los 26 de julio en la plaza.
            </p>
          </div>
        </div>
      </section>

      <div className="image-collage right-wide">
        <div
          className="image-collage-item lightbox-trigger"
          onClick={() => openLightbox(`${BASE}/archivo_dictadura_3.webp`, 'Archivo — dictadura en Tandil')}
          role="button" tabIndex={0} aria-label="Ver imagen ampliada"
        >
          <Image
            src={`${BASE}/archivo_dictadura_3.webp`}
            alt="Archivo — dictadura en Tandil"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 34vw"
          />
        </div>
        <div
          className="image-collage-item lightbox-trigger"
          onClick={() => openLightbox(`${BASE}/archivo_dictadura_4.webp`, 'Archivo — dictadura en Tandil')}
          role="button" tabIndex={0} aria-label="Ver imagen ampliada"
        >
          <Image
            src={`${BASE}/archivo_dictadura_4.webp`}
            alt="Archivo — dictadura en Tandil"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 66vw"
          />
        </div>
      </div>

      {/* ════════════════════════════════
          CAPÍTULO VIII — MARZOCCA
         ════════════════════════════════ */}
      <section className="testimony" id="marzocca">
        <div className="testimony-header fade-in">
          <div>
            <h2 className="testimony-title">
              Huecos imposibles <em>de llenar</em>
            </h2>
          </div>
          <div className="testimony-who">
            <strong>Petra Marzocca</strong>
            Trabajadora de la salud, integrante de espacios de derechos humanos, cofundadora de
            "Memoria por la Vida en Democracia"
          </div>
        </div>
        <div className="testimony-body">
          <div className="testimony-image">
            <Image
              src={`${BASE}/documental_24m_4.webp`}
              alt="Petra Marzocca"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          <div className="testimony-text fade-in">
            <p>
              El 24 de marzo de 1976, La Plata amaneció bajo un clima que ya no era sorpresa para
              quienes militaban. Para Petra Marzocca, trabajadora de la salud e integrante de
              espacios vinculados a la organización de base y la Juventud Peronista, el golpe fue la
              confirmación de una escalada represiva que llevaba tiempo en marcha. "Ya había
              secuestros, desapariciones. Los controles eran parte de la vida cotidiana", refirió.
              Esa mañana, el grupo acordó un punto de encuentro: el mercado. Solo miradas. "Nos
              reconocíamos sin hablarnos. Así sabíamos si estábamos todas o si faltaba alguien".
              Ninguna de sus compañeras del área de salud sobreviviría.
            </p>
            <p>
              En octubre de 1976 Petra pudo salir de La Plata y se radicó en Río Negro, provincia
              que la cobijó varios años. Recién en 1984, ya en democracia, pudo empezar a reconstruir
              lo que había ocurrido con su familia. Sus dos hermanos, Ángel y Mario, y su cuñada,
              fueron desaparecidos entre 1977 y 1978 en el conurbano bonaerense.
            </p>
            <div className="pullquote">
              <blockquote>
                No sabemos exactamente dónde los desaparecieron. Eso es lo que deja el terrorismo
                de Estado: huecos imposibles de llenar.
              </blockquote>
              <cite>Petra Marzocca</cite>
            </div>
            <p>
              Cuando volvió a Tandil, el contraste fue brutal. "Era como hablar otro idioma", dijo
              sobre sus primeros encuentros con conocidos. Mientras ella traía una experiencia
              atravesada por la persecución y la pérdida, gran parte de la sociedad sostenía que
              "acá no había pasado nada".
            </p>
            <p>
              En 1996, a 20 años del golpe, Petra fue parte de la creación de "Memoria por la Vida
              en Democracia", un espacio multisectorial que buscó visibilizar lo ocurrido en la
              ciudad. La primera marcha —del Dique al centro— marcó un antes y un después. Allí se
              denunciaron públicamente los centros clandestinos de detención locales y se pusieron
              nombres propios a las víctimas. Pero la reacción no tardó: amenazas, pintadas,
              seguimiento. "La inteligencia seguía funcionando".
            </p>
            <p>
              Una de las acciones más significativas fue la publicación en los diarios locales de las
              fotos y datos de personas desaparecidas de Tandil. "Era para que la gente se encontrara
              con eso en la vida cotidiana. Muchos decían: 'yo no sabía'".
            </p>
            <div className="pullquote">
              <blockquote>
                La historia hay que contarla para entender el territorio, con sus grises y sus
                contradicciones.
              </blockquote>
              <cite>Petra Marzocca</cite>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CAPÍTULO IX — TRAFICANTE
         ════════════════════════════════ */}
      <section className="testimony" id="traficante">
        <div className="testimony-header fade-in">
          <div>
            <h2 className="testimony-title">
              "Yo sé que ese bebé nació{' '}
              <em>y en algún lado está"</em>
            </h2>
          </div>
          <div className="testimony-who">
            <strong>Cecilia Traficante</strong>
            Hermana de María Hebe Traficante, desaparecida en junio de 1977
          </div>
        </div>
        <div className="testimony-body">
          <div className="testimony-image">
            <Image
              src={`${BASE}/cecilia traficante.jpg`}
              alt="Cecilia Traficante"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          <div className="testimony-text fade-in">
            <p>
              Cecilia Traficante no pudo recordar con precisión el 24 de marzo de 1976. Tenía 16
              años y vivía en Benito Juárez. Pero su memoria se vuelve precisa y dolorosamente clara
              a partir de 1977, cuando su hermana María Hebe fue secuestrada. María Hebe, de 24 años,
              y su compañero, Carlos Martínez, fueron secuestrados a fines de junio de ese año en
              Tandil. Se los llevaron del "Hotel Turista", en 14 de Julio al 60, donde vivían por su
              trabajo.
            </p>
            <div className="pullquote">
              <blockquote>
                Pararon tres autos negros, bajaron unas diez personas armadas. Mostraron una
                credencial, preguntaron por ellos. La dueña del hotel no quería decir nada, pero la
                amenazaron con su hijo.
              </blockquote>
              <cite>Cecilia Traficante, según testigos del secuestro</cite>
            </div>
            <p>
              La noticia del secuestro llegó tres días después. Cecilia recuerda con exactitud ese
              momento: estaba atándose los cordones para ir al colegio cuando vio llegar al padre de
              Carlos. "Ahí les contó a mis papás que se habían llevado a los chicos. Fue la primera
              vez que vi llorar a mi papá".
            </p>
            <p>
              Desde entonces, la casa quedó atravesada por el silencio. "Mi mamá no hablaba.
              Recordaba cosas lindas de cuando ella estaba, pero del tema no se hablaba. Todo lo hizo
              mi papá: denuncias, gestiones, lo que se podía. En Juárez ningún abogado quiso ayudar.
              Tuvieron que buscar en Tandil".
            </p>
            <p>
              Con los años, apareció otro dato que reconfiguró el dolor: María Hebe estaba embarazada
              de cuatro meses al momento del secuestro. "Fue una mezcla de todo: miedo, esperanza,
              angustia. Pero también fue algo que a mis papás les dio alegría. Decían 'nos dejó algo'".
              A partir de entonces comenzó otra búsqueda: la del nieto o nieta nacido en cautiverio.
            </p>
            <div className="pullquote">
              <blockquote>
                Seguimos esperando. Yo sé que ese bebé nació y en algún lado está. Y lo seguimos
                esperando.
              </blockquote>
              <cite>Cecilia Traficante</cite>
            </div>
            <p>
              Cuando recuerda a su hermana, aparecen escenas simples: su llegada a la casa, su ropa,
              sus gestos. "Era libre, solidaria, muy inteligente. No le importaba lo material. Era una
              buena persona". A casi cinco décadas, la ausencia sigue siendo una presencia constante.
              La primera Navidad después de la desaparición: "Le pusimos el plato. La esperamos. No
              vino".
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CAPÍTULO X — FERNÁNDEZ
         ════════════════════════════════ */}
      <section className="testimony" id="fernandez">
        <div className="testimony-header fade-in">
          <div>
            <h2 className="testimony-title">
              Y nosotros apenas <em>sobreviviendo</em>
            </h2>
          </div>
          <div className="testimony-who">
            <strong>Walter Fernández</strong>
            Fundador de Granja Los Pibes, sobreviviente de detención clandestina
          </div>
        </div>
        <div className="testimony-body">
          <div className="testimony-image">
            <Image
              src={`${BASE}/documental_24m_2.webp`}
              alt="Walter Fernández"
              fill
              style={{ objectFit: 'cover', objectPosition: 'top' }}
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          <div className="testimony-text fade-in">
            <p>
              La historia de Walter Fernández se entrelaza con la de toda una generación marcada por
              la militancia política, la represión y la violencia de la última dictadura. Creció en
              la zona de 14 de Julio y Constitución, un barrio donde compartía la infancia con
              amigos que, años más tarde, también quedarían alcanzados por la represión.
            </p>
            <div className="pullquote">
              <blockquote>
                Poníamos un disco de Arcoíris, de Sui Generis, y hablábamos de política.
              </blockquote>
              <cite>Walter Fernández, sobre las reuniones juveniles</cite>
            </div>
            <p>
              En 1975, en un clima de creciente violencia, la organización decidió el pase a la
              clandestinidad. Fernández se casó con Mabel, su compañera, y se trasladó a La Plata.
              El golpe del 24 de marzo de 1976 los sorprendió allí. Poco después, quedaron
              desconectados de la organización y debieron sobrevivir en condiciones extremas.
            </p>
            <p>
              Los interrogatorios y traslados clandestinos comenzaron de inmediato. Tras pasar por
              el centro clandestino conocido como "La Huerta", donde permaneció cerca de tres meses,
              fue trasladado a una unidad penitenciaria.
            </p>
            <div className="pullquote">
              <blockquote>
                A esa altura yo ya sabía que al Diente y a Gustavo los habían matado en Bahía
                Blanca, y que Marocchi había desaparecido en Mar del Plata.
              </blockquote>
              <cite>Walter Fernández</cite>
            </div>
            <p>
              Fernández recuperó la libertad en 1978. El regreso no fue sencillo: el miedo persistía
              y la vida cotidiana estaba atravesada por la desconfianza. No se animaba a andar solo.
            </p>
            <p>
              El regreso al barrio tampoco fue como lo había imaginado. Los vecinos no lo saludaban
              y tampoco a su madre o a su abuela.
            </p>
            <div className="pullquote">
              <blockquote>
                Nos despedimos con un abrazo porque nos íbamos a cambiar el mundo y a algunos los
                trajeron en una cajita, otros no volvieron.
              </blockquote>
              <cite>Walter Fernández</cite>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CAPÍTULO XI — JUICIOS (TIMELINE)
         ════════════════════════════════ */}
      <section className="timeline-section" id="juicios">
        <div className="fade-in">
          <h2 className="timeline-section-title">
            Los juicios y la búsqueda{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gray-200)' }}>
              de la verdad
            </em>
          </h2>
        </div>

        <div className="timeline fade-in">
          <div className="timeline-item">
            <div className="timeline-year">2012</div>
            <div className="timeline-title">Juicio por el asesinato de Carlos Moreno</div>
            <div className="timeline-text">
              Se realizó en Tandil el juicio por el secuestro y asesinato del abogado laboralista
              Carlos Moreno. Fueron condenados los cinco acusados, entre ellos dos civiles: los
              hermanos Emilio y Julio Méndez. Ambos fueron absueltos en un fallo posterior. Emilio
              murió en 2023, sin conocer la definición procesal final de la Justicia.
            </div>
            <div className="testimony-image" style={{ marginTop: '1.5rem', maxWidth: '560px' }}>
              <Image
                src={`${BASE}/hermanos_mendez.webp`}
                alt="Hermanos Emilio y Julio Méndez"
                fill
                style={{ objectFit: 'cover' }}
                sizes="560px"
              />
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2025</div>
            <div className="timeline-title">Juicio La Huerta</div>
            <div className="timeline-text">
              Culminó el juicio donde se juzgaron gran parte de los crímenes de lesa humanidad
              cometidos en Tandil y la región. De los 35 acusados, la Justicia condenó a ocho y
              absolvió a los otros 27. Las querellas apelaron esta decisión.
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2026</div>
            <div className="timeline-title">La búsqueda continúa</div>
            <div className="timeline-text">
              A 50 años del golpe de Estado, las familias y organismos de derechos humanos continúan
              buscando saber qué pasó con los desaparecidos de Tandil, y en particular por el destino
              de dos bebés que debieron haber nacido en cautiverio. Uno, el hijo de María Hebe
              Traficante y Carlos Martínez, que tendría que haber nacido entre noviembre y diciembre
              de 1977. Otro, el hijo de Haydée Susana Valor y Omar Marocchi, que tendría que haber
              nacido entre marzo y abril de 1977. En las aulas, en los clubes y en las plazas, Tandil
              sigue haciendo memoria.
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CLOSING
         ════════════════════════════════ */}
      <section className="closing">
        <div className="closing-content fade-in">
          <div className="closing-quote">
            "En las aulas, en los clubes y en las plazas, Tandil sigue haciendo memoria."
          </div>
          <p className="closing-text">
            Este especial fue posible gracias a los testimonios de quienes aceptaron compartir sus
            vivencias. A ellos, nuestro profundo agradecimiento. Porque contar es una forma de
            resistir, y recordar, una forma de construir futuro.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════
          FOOTER
         ════════════════════════════════ */}
      <footer className="footer">

        <div className="footer-top">
          <p className="footer-statement">
            Desde las voces de vecinos sobrevivientes, testigos y protagonistas de aquella época,
            este especial de <em>El Eco</em> busca acercarse a responder una pregunta:{' '}
            <strong>¿Cómo se vivió la dictadura en Tandil?</strong>
          </p>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <div className="footer-col-title">Archivos y fuentes</div>
            <ul className="footer-sources">
              <li>Archivo del diario El Eco de Tandil</li>
              <li>Archivo diario Nueva Era — Hemeroteca Biblioteca Rivadavia</li>
              <li>Archivo Memoria por la Vida en Democracia</li>
              <li>Página Desaparición María Hebe Traficante y Carlos Martínez</li>
              <li>Archivo Provincial de la Memoria</li>
              <li>Huellas de la Memoria</li>
              <li>Faro de la Memoria</li>
              <li>Recuerdos de vecinos y vecinas de Tandil</li>
            </ul>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Bibliografía</div>
            <ul className="footer-sources footer-biblio">
              <li>
                <em>Tandil Bicentenario (De aldea a ciudad)</em>
                <span>Unicen, 2023</span>
              </li>
              <li>
                <em>Los trabajadores argentinos y la última dictadura</em>
                <span>Daniel Dicósimo — Unicen, 2018</span>
              </li>
            </ul>
          </div>

          <div className="footer-col footer-col-credits">
            <div className="footer-col-title">Realización</div>
            <div className="footer-names">
              <span>Marisol Córdoba</span>
              <span>Juan Manuel Artero</span>
            </div>
            <div className="footer-place">Tandil, 2026</div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-brand">El Eco de Tandil · Especiales</span>
        </div>

      </footer>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="lightbox-overlay" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Cerrar">✕</button>
          <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              style={{ objectFit: 'contain' }}
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  )
}
