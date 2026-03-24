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
          <figure className="testimony-figure">
            <div className="testimony-image portrait">
              <Image
                src={`${BASE}/zanatelli.webp`}
                alt="Coronel Juan Domingo Zanatelli, interventor de Tandil tras el golpe del 24 de marzo de 1976"
                fill
                style={{ objectFit: 'cover', objectPosition: 'top' }}
                sizes="100vw"
              />
            </div>
            <figcaption className="testimony-caption">Julio José Zanatelli</figcaption>
          </figure>
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
            <p>Una pregunta resuena y horada el imaginario colectivo: ¿Hasta dónde llegó en Tandil la participación de los distintos sectores civiles y eclesiásticos en la dictadura?</p>
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
              Roberto Tassara, contador público y exRector de la Unicen, estaba en su departamento, a pocas cuadras de la universidad y del estudio contable donde trabajaba, cuando se enteró del golpe de Estado del 24 de marzo de 1976. La noticia le llegó, como a la mayoría en ese tiempo, a través de la radio. No era la primera vez que vivía una interrupción institucional. Había atravesado, desde joven, distintos golpes de Estado en el país, lo que le dio un marco inicial para entender lo que estaba ocurriendo. En ese momento lo pensó como una continuidad: un nuevo golpe cívico-militar, como los anteriores.
            </p>
            <p>
              Tras escuchar la noticia, salió a la calle. Caminó hasta el estudio donde trabajaba y desde allí se dirigieron a la sede de la Universidad Nacional del Centro, en pleno centro de la ciudad. Tassara era nodocente, se desempeñaba como director general de Presupuesto y además tenía una dedicación simple como docente. Al llegar, encontró que también allí se habían producido cambios: el rector había sido reemplazado por un interventor militar. El funcionamiento institucional comenzaba a reconfigurarse.
            </p>
            <p>
              Con el paso de los días, comenzaron a aparecer señales perturbadoras. Una de ellas fue la visita de la familia de una excompañera de estudios, que había sido detenida en Benito Juárez sin que se supiera su paradero. Tassara y otros colegas intentaron averiguar qué había sucedido. Lograron entrevistarse con un militar que les confirmó que la joven estaba detenida en Sierra Chica. “La tenemos nosotros”, les dijo y agregó que la joven había sido inteligente en no mencionarlos porque en ninguno de sus papeles aparecían los nombres de los tres profesionales que habían ido a preguntar por ella. Caso contrario, el militar les espetó que debería haberlos llamado para “hablar”. 
            </p>
            <p>“Nos ratificó en el error de pensar que era todo similar a los golpes anteriores”, señaló. Aún no dimensionaban la magnitud del terrorismo de Estado ni la lógica de las desapariciones. “Hoy parece impensado, pero se sabía poco”, refirió.</p>
            <p>
             Esa misma jornada, atravesado por la incertidumbre, tomó una decisión que le quedó grabada: al regresar a su departamento, reunió revistas, libros y materiales vinculados a la Unión Soviética -que había heredado de su padre comunista y que incluía información sobre ajedrez- y al pensamiento marxista, y los arrojó al incinerador del edificio. Fue un gesto de autoprotección, motivado por el temor a posibles represalias.
            </p>
            <p>
              Como miembro del Consejo Profesional de Ciencias Económicas, fue convocado a formar parte de la Cotac, una comisión civil de asesoramiento al gobierno de facto, integrada por representantes de la Asociación de la Pequeña y Mediana Industria Metalúrgica, la Cámara Comercial e Industrial, la Sociedad Rural, la Asociación de Abogados, el Colegio de Médicos, el Centro Profesional de la Ingeniería, el Círculo de Veterinarios, el Colegio de Escribanos, el Consejo Profesional de Ciencias Económicas y dos miembros de las Fuerzas Armadas.
            </p>
            <p>
              “En el 76, o quizás en el 77, por ser miembro del Consejo Profesional de Ciencias Económicas, me convocaron a participar de una reunión con representantes de otras instituciones. El objetivo era debatir cuestiones vinculadas con la ordenanza impositiva municipal, es decir, la que fija tasas, contribuciones y demás. Recuerdo haber asistido a una reunión; puede que hayan sido dos, pero no estoy seguro. Después dejé de ir, aunque creo que el espacio continuó funcionando. Lo que me llevó a tomar esa decisión fue que advertí que, de algún modo, se intentaba reemplazar al Concejo Deliberante: como si ciertos grupos sociales de Tandil pudiéramos definir, al menos en lo económico, el destino de la ciudad. Ante eso, decidí apartarme”. La Cotac funcionó por lo menos hasta 1977 y tuvo injerencia en el destino del matadero municipal, que terminó cerrando sus puertas, en tanto se puso en marcha uno privado.
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
             El nombre de Alicia Martignoni está indefectiblemente ligado a la educación tandilense. Ejerció 40 años como docente, fue regente del Instituto Superior de Formación Docente y Técnica 10 y fundó en la década del 80 la Sala Abierta de Lectura. En diálogo con El Eco de Tandil recordó con nitidez el clima previo al golpe de Estado, no desde la sorpresa sino desde una certeza inquietante: la de haber sabido, incluso antes del 24 de marzo de 1976, que una etapa oscura se avecinaba.
            </p>
            <p>
              “Yo estaba estudiando en Buenos Aires cuando cerraron la Facultad de Filosofía y Letras, durante el gobierno de Isabel. Ahí decidimos con mi marido venirnos a Tandil, casarnos y quedarnos. Teníamos miedo”, contó. Había avanzado buena parte de la carrera de Letras en la Universidad de Buenos Aires, que luego terminaría en el Instituto San José. Pero el contexto ya era otro: compañeros que desaparecían, listas negras, allanamientos.
            </p>
            <p>
              El día del golpe lo vivieron como tantos otros: trabajando, en silencio, aferrados a la radio. “Estábamos muy asustados. Sí, ese día estábamos por poco debajo de la cama, porque estábamos con mi marido, yo recién me había casado el 23 de enero del 76, y nosotros sí sabíamos que estaban desapareciendo compañeros ya desde hacía por lo menos un año, otros compañeros y compañeras que aún viven estaban presos por el accionar contra la llamada subversión y estaban desapareciendo muchos compañeros. A diferencia de lo que muchos dicen hoy, nosotros sabíamos que era una desgracia lo que venía”.
            </p>
            <p>
              En 1976 proyectaban abrir un kiosco en la terminal de Tandil. Poco después, Alicia comenzaría a trabajar en el “Centro Educativo Complementario 801”, dentro de la rama de psicología. Pero la vida cotidiana se volvió un ejercicio de repliegue.
            </p>
            <p>
              “Uno tiene lagunas de esos años. Nos cuidábamos mucho. Yo en el 77 tuve a mi hija mayor y me refugié en la vida familiar, en el barrio del hospital donde me crie. Era una forma de protegernos”. En su entorno familiar, el terror también se manifestaba en gestos concretos: “Agarraron muchos de mis libros y los enterraron en la casa de mi abuelo, por si acaso”.
            </p>
            <p>
              En el ámbito educativo, la dictadura también dejó su marca. Alicia había participado en la elaboración de diseños curriculares en los años previos. “Después vino una depuración. Decían que había ‘ideologías extrañas’. Hasta Piaget era subversivo. Era una situación muy extraña, casi absurda. Lo que más recuerdo, ya hacia fines de los setenta y comienzos de los ochenta, eran esos decretos. Yo trabajaba en el gabinete de una escuela y en ese contexto apareció un decreto del ministro Bruera, que era el ministro de Educación de la dictadura —no recuerdo si era militar o civil—, que prohibía pedir libros en las escuelas. Con el grupo de mujeres que después fundamos la Sala Abierta de Lectura estábamos muy unidas en ese momento y estábamos verdaderamente escandalizadas. Trabajábamos juntas en la Escuela 14, sobre avenida Rivadavia, y ahí mismo armamos una biblioteca, porque esa era nuestra obsesión: que los chicos tuvieran acceso a libros. Una de las cosas que más nos impactaba era que en muchas escuelas había libros de la década del sesenta, completamente desactualizados. Por eso, que nos dijeran que no se podían pedir libros lo vivimos como una afrenta. Recuerdo que Adela Castronovo solía decir que era absurdo que se insistiera con la obligatoriedad del delantal, pero no con algo esencial: ir a la escuela con libros, que es justamente para lo que se va a estudiar", detalló.
            </p>
            <p>
             Esa prohibición, lejos de inmovilizarlas, generó una reacción. Junto a otras docentes, impulsó la creación de bibliotecas escolares y, más adelante, proyectos como el Club de Narradores y la Sala Abierta de Lectura.
            </p>
            <p>
              Con la llegada de la democracia, esos proyectos crecieron. Pero insistió en que muchas de esas iniciativas nacieron en los márgenes, incluso en plena dictadura, como formas de resistencia cultural.
            </p>
            <p>
              Para ella, la memoria no es solo un ejercicio del pasado, sino una tarea permanente. “Analizando los datos, contando lo que pasó, mucha gente vuelve a pensar. Yo tengo fe en eso”.
            </p>
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
             “Soy Néstor Dipaola y ya para ese entonces, el 24 de marzo del 76, yo estaba trabajando en este diario, El Eco de Tandil, desde ocho años atrás”, comenzó la entrevista el entrañable periodista y escritor. También recordó que se desempeñaba en la universidad, donde había sido nombrado a fines de 1975 tras un concurso público. El golpe lo sorprendió trabajando en ambos ámbitos.
            </p>
            <p>
              En relación con su trabajo periodístico, en esos años se desempeñaba en la sección
              Deportes, por lo que no tenía una participación directa en la cobertura política del
              diario. Decidió permanecer en esa sección para poder seguir escribiendo y opinando,
              algo que en otras áreas estaba vedado.
            </p>
            <p>
              Recordó que aquella mañana se encontraba en la universidad y que, en un momento, decidió acercarse al “Bar Ideal”, un espacio de encuentro de la dirigencia política local. “Y bueno, por supuesto, caras largas”, describió. Señaló que entre los presentes había posiciones diversas, incluso algunas favorables al golpe.
            </p>
            <p>
              En relación con su trabajo periodístico, en esos años se desempeñaba en la sección Deportes, por lo que no tenía una participación directa en la cobertura política del diario. Aun así, percibía el clima general dentro de la redacción: “También pasaba lo mismo en El Eco, en la redacción”.
            </p>
            <p>
              Con el correr del tiempo, la censura se volvió evidente. “Muy rápidamente nos dimos cuenta de que había una censura encubierta y a veces no tan encubierta”. En ese contexto, decidió permanecer en la sección Deportes para poder seguir escribiendo y opinando, algo que en otras áreas estaba vedado, y pidió que lo dejaran en Deportes justamente por eso.
            </p>
            <p>
              Relató dos episodios que, según su experiencia, evidenciaron de manera directa el funcionamiento de la censura. El primero ocurrió hacia 1977, durante la organización de un desfile militar en Tandil. Tras una conferencia de prensa, un coronel dio una orden explícita: “Y quiero ver mañana en las páginas de los diarios por lo menos una página o dos completas sobre esta información. Y quiero ver fotos, fotos bien grandes”.
            </p>
            <p>
              El segundo episodio se vinculó con la cobertura del otorgamiento del Premio Nobel de la Paz a Adolfo Pérez Esquivel. A través de los teletipos de la agencia oficial “Télam”, llegó una directiva clara: “Se recomienda a los señores editorialistas brindar escasa importancia a esta información”. Este tipo de indicaciones eran frecuentes.
            </p>

            <p>No es un detalle menor que Juan Manuel Calvo, entonces director de El Eco de Tandil, tendría dos hijas desaparecidas, pero Dipaola expuso que “jamás se publicó ni como información ni como nada en las páginas del diario”.</p>
            <p>Sobre el clima social, señaló que la magnitud del terrorismo de Estado no era conocida en su totalidad durante esos años. Aun así, percibía que ocurrían hechos graves. “Uno se daba cuenta que había algo, no malo, malísimo, horrible”, indicó, aunque sin dimensionar la cantidad de víctimas.</p>
            <p>También recordó particularmente la visita de Jorge Rafael Videla a la ciudad y la reacción de parte de la población. “Había bastante gente y la mitad, o tal vez un poco más de la mitad, aplaudiendo a gritos, aprobando el gobierno de Videla”.</p>
            <p>Finalmente, destacó el retorno de la democracia como uno de los momentos más significativos de su carrera. Recordó especialmente el clima político y el intercambio en el “Bar Ideal”, donde encontraba insumos para sus columnas periodísticas. Ese período marcó un contraste fuerte con los años anteriores; fue una etapa de intensa participación y libertad para expresarse.</p>

            
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
                Julio Elichiribehety, dirigente de la UCR local, reconstruyó sus recuerdos desde una experiencia atravesada por la juventud, la distancia inicial con la política y una comprensión que, según contó, se fue profundizando con el paso del tiempo. Tenía poco más de veinte años y aún no había votado. “Yo tenía 20 años, había cumplido los 21. No militaba en política y ni siquiera había votado todavía. Voté por primera vez a los 29 años”, recordó, circunstancia que refleja la inestabilidad institucional de aquellas décadas.
            </p>
            <p>
            Aquel día, dijo, lo sorprendió en un contexto que ya anticipaba una ruptura institucional. “Había un clima previo, una percepción de que podía haber algún tipo de interrupción institucional, de golpe de Estado, de un gobierno que estaba como jaqueado”, expresó. En su mirada retrospectiva, insistió en que estos procesos no fueron hechos aislados: “Los golpes de Estado no son producto de un hecho mesiánico, sino que son planificados, pensados, y han tenido adhesión de sectores de la sociedad”.
            </p>
            <p>En relación con Tandil, que por entonces contaba con poco más de 70 mil habitantes, describió una ciudad con un clima particular. “No es que no pasaba nada, pero había una mirada un tanto laxa sobre los temas”, sostuvo. Recordó, por ejemplo, la desaparición de vecinos conocidos como hechos que circulaban en voz baja: “Era todo como un comentario: ‘¿qué pasó?, ¿se lo llevaron?’, pero no había movilizaciones ni manifestaciones”.            </p>
            <p>Para Elichiribehety, durante los primeros años de la dictadura predominó una especie de silencio social. “Había como una demanda subterránea, por debajo de la media”, explicó. En ese sentido, coincidió parcialmente con la idea de que en ciudades del interior “parecía que no sucedía nada”, aunque aclaró: “No digo que no pasaba nada, digo que pasaba, pero no había emergentes de sectores movilizándose”. Y también remarcó que los abogados Victorino y Juan Carlos Pugliese (h), Pedersoli y Gutiérrez se animaron a presentar hábeas corpus para conocer el destino de las personas secuestradas.</p>
            <p>El punto de inflexión en su vida política llegó con la recuperación democrática y la figura de Raúl Alfonsín. “A mí me seduce definitivamente Alfonsín. Soy de los que llegan a militar y a afiliarse al radicalismo por su figura”, afirmó. </p>
            <p>Ya en democracia, su participación en organismos de derechos humanos lo llevó a involucrarse en discusiones locales sobre el pasado reciente. En ese marco, también reflexionó sobre la vida política de Tandil y ciertas continuidades. Sobre la figura de Julio Zanatelli, señaló que no tuvo un vínculo directo, aunque sí diferencias ideológicas. Y aportó una mirada crítica sobre la recepción social de dirigentes vinculados al orden autoritario: “Bussi (represor y exgobernador de Tucumán) vino a una asunción en Tandil y no tuvo un repudio fuerte. No digo que pasó desapercibido, pero tampoco hubo un escrache”.</p>
            <p>Estos elementos permiten pensar rasgos persistentes en la cultura política local. “Eso refleja un perfil, lo que algunos llaman el votante del orden”, analizó.</p>

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
              En 1974, Enrique Lalloz empezó a consolidar una trayectoria en la industria local. Ingeniero metalúrgico, se desempeñó durante más de 30 años en Metalúrgica Tandil, donde llegó a ser gerente. Su recuerdo de aquellos años no se centra en un hecho puntual, sino en un proceso que, con el tiempo, marcaría un quiebre profundo en la actividad productiva local.
            </p>
            <p>“En el año 76 yo ya tenía experiencia en metalúrgica, estaba escalando posiciones. Al ser profesional y tener años de trabajo, uno empieza a tomar contacto con las partes directivas de la empresa”, contó. Desde ese lugar, vivió en primera línea los cambios que comenzaron a desplegarse tras el golpe. “Cuando uno analiza los períodos posteriores a 1976, es otro país, otra industria, otra mentalidad”, planteó. Y fue directo al impacto: “Todo lo que vino después fue realmente lapidario para la actividad industrial y para el país”.</p>
            <p>Lalloz recordó el peso que tenía entonces “Metalúrgica Tandil” en el entramado productivo. “Era una empresa emblemática, no solo a nivel nacional sino regional. Trabajábamos para todas las automotrices: General Motors, Mercedes-Benz, Renault, Fiat. Era un volumen muy alto de producción”, enumeró. Y agregó: “Prácticamente se podía fabricar un motor entero en Tandil”.</p>
            <p>Sin embargo, ese escenario comenzó a cambiar rápidamente. “En el año 78, con la política económica de Martínez de Hoz, empezó una desindustrialización muy fuerte”, afirmó. En ese sentido, cuestionó la apertura de importaciones: “Se abrió la importación masiva e indiscriminada y muchas actividades empezaron a sucumbir”.</p>
            <p>El impacto fue inmediato en la empresa. “Cayó el 30 por ciento de la producción de Metalúrgica Tandil por dejar de fabricar piezas para General Motors. Eso para cualquier industria es un golpe muy fuerte”, explicó.</p>
            <p>A la par, describió un cambio de clima en torno a la industria nacional. “Se empezó a denostar el equipamiento, la tecnología, se instaló la idea de que el país no estaba para eso”, señaló. Y marcó una contradicción de época: “Por un lado se criticaban los autos nacionales, pero las fuerzas de seguridad usaban los Ford Falcon, tristemente famosos”.</p>
            <p>El deterioro no fue solo productivo. “Fue una etapa muy dura, muy severa, de desindustrialización”, insistió. Y lo vinculó con consecuencias sociales: “Metalúrgica también sufrió pérdidas humanas, desapariciones de personas. Es muy conmocionante ver que alguien desaparece del ámbito laboral y nunca más se sabe de él”.</p>
            <p>La consecuencia, con el paso de los años, fue visible en la ciudad. “Hoy ves galpones abandonados, actividad caída. Antes podíamos fabricar un motor entero y hoy no podemos hacer un bloc”, comparó. “Metalúrgica Tandil” cerró definitivamente en 2018.</p>
            <p>También puso números a ese deterioro. “Cuando ingresé había unos 1.100 trabajadores. Después bajó a 800, a 600, y así fue cayendo hasta cifras mucho más bajas”, detalló. A modo de balance, dejó una reflexión crítica: “No ha sido una etapa buena para recordar y pareciera que no nos ha servido de aprendizaje. Es una y otra vez repetir los mismos errores. Es muy impactante ver la diferencia entre lo que fuimos capaces de hacer y lo que quedó”, concluyó.</p>

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
             <p> Desde el barrio Obrero —también conocido como barrio General Belgrano— Adriana Palacio y Juan de Dios González reconstruyeron sus memorias del 24 de marzo de 1976 y de los años que siguieron, atravesados por el miedo, la incertidumbre y la vida cotidiana alterada.</p>
            <p>Adriana evocó una escena precisa de ese día, cuando era adolescente y salía rumbo a la escuela. “Salí de casa como todas las mañanas para ir a la Polivalente, en 9 de Julio. Fui a buscar a mi prima y cuando llegamos no andaba nadie. Estaba todo desierto”, recordó. La imagen que siguió quedó grabada con nitidez: “Había dos soldados con armas largas que no nos dejaban pasar. ‘Hoy no hay clase’, nos dijeron. Y vos no te atrevías a decir nada más. Yo le miraba la cara y la tengo como si hubiera pasado ayer”.</p>
<p>Juan de Dios situó ese día como parte de un proceso más amplio. “Fue el corolario de una serie de situaciones que se venían viviendo desde antes. Es como que se institucionalizó lo que ya pasaba en las sombras”, explicó. En ese clima, los indicios ya estaban: “Sabíamos de allanamientos en casas de gente conocida, de gente laburante. Y las generaciones mayores te decían: ‘tengan cuidado, entierren los libros’”.</p>
<p>El miedo atravesaba la vida cotidiana, incluso sin comprender del todo lo que ocurría. “Éramos pibes y no teníamos la información que hay hoy. De repente escuchabas cosas y después esos vecinos no estaban más. La casa con un cartel de venta. Una incertidumbre en el cuerpo, horrible”, relató Adriana.</p>
<p>La vida en el barrio, marcado por su identidad trabajadora, también se vio golpeada. “Todos atravesados por gremios: mi papá municipal, al lado un metalúrgico. Y el miedo, porque te enterabas que entraban a las casas, que allanaban”, contó.</p>
<p>Juan de Dios agregó: “Ellos tenían que derribar toda forma de organización de base. Los gremios fueron intervenidos. Y eso iba debilitando todo, porque en las fábricas aparecían personas que no representaban a los trabajadores”. En las calles, la presencia militar era constante. “Tandil tenía mucho más asentamiento militar del que creíamos. Salían fuerzas de todos lados”, dijo.</p>
<p>La experiencia del miedo también se expresó en episodios concretos. Adriana recordó una noche en un local bailable: “Se prendieron todas las luces y entró la Policía. Nos llevaron a todos en un camión celular. Estuvimos toda la noche en la comisaría. Éramos menores. Una cosa espantosa”.</p>
<p>En ese contexto, las decisiones familiares también cambiaban la vida. “Mi papá me sacó de la escuela por miedo. No me explicaba mucho, pero algo sabía. Y tuve que empezar de nuevo en otra escuela nocturna”, contó.</p>
<p>Sobre la percepción de lo que realmente ocurría, Adriana fue clara: “Yo no sabía. Sabía lo que vivía, pero nunca imaginé lo que estaba pasando en Tandil”. Juan de Dios, en cambio, tuvo un contacto más directo con la represión: “En mi casa hubo allanamientos, incluso antes del golpe. Ahí empezás a darte cuenta de lo que pasa. Nada de esto fue improvisado”.</p>
<p>En esa trama colectiva aparece una historia que ambos destacan como símbolo: la protección del busto de Eva Perón en la plaza del barrio. “Siempre se lo llevaban en cada dictadura. Y nosotros pensábamos que se lo había llevado la Policía pero no, lo tenían los vecinos”, contó Adriana.</p>
<p>Juan de Dios completó: “Lo guardaban en sus casas, en un placard, en un altillo. Y después lo volvían a poner. Siempre. El barrio lo resguardó en cada dictadura”. Ese gesto, repetido en el tiempo, sintetiza para ambos una forma de resistencia silenciosa. “Hoy todavía se hacen homenajes todos los 26 de julio en la plaza. Y va el barrio, y va gente de toda la ciudad”, compartieron.</p>

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

<p>El 24 de marzo de 1976, La Plata amaneció bajo un clima que ya no era sorpresa para quienes militaban. Para Petra Marzocca, trabajadora de la salud e integrante de espacios vinculados a la organización de base y la Juventud Peronista, el golpe de Estado fue la confirmación de una escalada represiva que llevaba tiempo en marcha.</p>
<p>“Ya había secuestros, desapariciones. Los controles eran parte de la vida cotidiana”, refirió. Esa mañana, como otras, el grupo al que pertenecía había acordado un punto de encuentro: el mercado. No había saludos ni conversaciones. Solo miradas. “Nos reconocíamos sin hablarnos. Así sabíamos si estábamos todas o si faltaba alguien”. Ninguna de sus compañeras del área de salud sobreviviría.</p>
<p>En octubre de 1976 Petra pudo salir de La Plata y se radicó en Río Negro, provincia que la cobijó varios años. Recién en 1984, ya en democracia, pudo empezar a reconstruir lo que había ocurrido con su familia. Sus dos hermanos, Ángel y Mario, y su cuñada, fueron desaparecidos entre 1977 y 1978 en el conurbano bonaerense.</p>
<p>Las investigaciones posteriores, junto a organismos y equipos forenses, permitieron establecer posibles destinos: Campo de Mayo y la ESMA aparecen como hipótesis con base en patrones represivos de la época.</p>
<p>Pero las certezas son pocas. “No sabemos exactamente dónde los desaparecieron. Eso es lo que deja el terrorismo de Estado: huecos imposibles de llenar”. Cuando volvió a Tandil, el contraste fue brutal. “Era como hablar otro idioma”, dijo sobre sus primeros encuentros con conocidos. Mientras ella traía una experiencia atravesada por la persecución y la pérdida, gran parte de la sociedad sostenía que “acá no había pasado nada”.</p>
<p>Ese negacionismo social —no necesariamente ideológico, sino también producto del miedo y el aislamiento informativo— marcó sus primeros años. El punto de quiebre llegó con las movilizaciones contra los levantamientos militares de los años ochenta. “Ahí encontré otro Tandil. Gente que sabía, que había resistido”. También fue clave el encuentro con referentes de derechos humanos como Adolfo Pérez Esquivel, que ayudaron a tejer redes y reconstruir memorias.</p>
<p>En 1996, a 20 años del golpe, Petra fue parte de la creación de “Memoria por la Vida en Democracia”, un espacio multisectorial que buscó visibilizar lo ocurrido en la ciudad. “Las sociedades necesitan tiempo para procesar. Acá ese tiempo fue más o menos de dos décadas”, reflexionó.</p>
<p>La primera marcha —del Dique al centro— marcó un antes y un después. Allí se denunciaron públicamente los centros clandestinos de detención locales y se pusieron nombres propios a las víctimas. Pero la reacción no tardó: amenazas, pintadas, seguimiento. “La inteligencia seguía funcionando. Nos llamaban y daban datos de nuestras familias”.</p>
<p>Aun así, avanzaron. Una de las acciones más significativas fue la publicación en los diarios locales de las fotos y datos de personas desaparecidas de Tandil. “Era para que la gente se encontrara con eso en la vida cotidiana. Muchos decían: ‘yo no sabía’”.</p>
<p>A cinco décadas del golpe, su reflexión no se limita al pasado. “La historia hay que contarla para entender el territorio, con sus grises y sus contradicciones”, afirmó. En su voz conviven la experiencia personal, la militancia y la reconstrucción colectiva. Como aquel 24 de marzo en La Plata, donde el silencio decía más que las palabras, su testimonio sigue señalando ausencias y la necesidad persistente de nombrarlas.</p>

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
              Cecilia Traficante no pudo recordar con precisión el 24 de marzo de 1976. Tenía 16 años y vivía en un pueblo chico, Benito Juárez. Sus primeros registros nítidos llegan después: calles con presencia militar constante, hombres armados en cada cuadra, una sensación de miedo que se volvió paisaje cotidiano. Pero su memoria se vuelve precisa y dolorosamente clara a partir de 1977, cuando su hermana María Hebe fue secuestrada.
            </p>
            <p>
              María Hebe, de 24 años, y su compañero, Carlos Martínez, fueron secuestrados a fines de junio de ese año en Tandil. Se los llevaron del “Hotel Turista”, en 14 de Julio al 60, donde vivían por su trabajo. Habían estado pocos días antes en la casa familiar.
            </p>
            <p>
              La reconstrucción de lo ocurrido llegó a través de testigos. “Pararon tres autos negros, bajaron unas diez personas armadas. Mostraron una credencial, preguntaron por ellos. La dueña del hotel no quería decir nada, pero la amenazaron con su hijo. Subieron y se los llevaron a la fuerza. Nunca más supimos nada”.
            </p>
            <p>
              La noticia del secuestro llegó tres días después. Cecilia recuerda con exactitud ese momento: estaba atándose los cordones para ir al colegio cuando vio llegar al padre de Carlos, que vivía en Córdoba. “Ahí les contó a mis papás que se habían llevado a los chicos. Fue la primera vez que vi llorar a mi papá”.
            </p>
            <p>
              Desde entonces, la casa quedó atravesada por el silencio. “Mi mamá no hablaba. Recordaba cosas lindas de cuando ella estaba, pero del tema no se hablaba. Todo lo hizo mi papá: denuncias, gestiones, lo que se podía. En Juárez ningún abogado quiso ayudar. Tuvieron que buscar en Tandil”.
            </p>
            <p>
              La desaparición no solo implicó la ausencia, sino también una vida cotidiana fracturada. “Yo iba al colegio y era como tener un secreto. Para todos era un día normal, pero para mí no. Nadie preguntaba. No sé si por miedo o por desinterés”.
            </p>
            <p>
              Con los años, apareció otro dato que reconfiguró el dolor: María Hebe estaba embarazada de cuatro meses al momento del secuestro. La familia lo supo tiempo después, a partir del testimonio de una prima de Carlos.
            </p>
            <p>
              “Fue una mezcla de todo: miedo, esperanza, angustia. Pero también fue algo que a mis papás les dio alegría. Decían ‘nos dejó algo’”. A partir de entonces comenzó otra búsqueda: la del nieto o nieta nacido en cautiverio.
            </p>
            <p>
              La familia realizó estudios de ADN y aportó muestras al “Equipo Argentino de Antropología Forense”. Nunca hubo resultados concluyentes, pero la espera continúa. “Seguimos esperando. Yo sé que ese bebé nació y en algún lado está”.
            </p>
            <p>
              Cecilia sigue vinculada a los espacios de memoria, participa cuando puede y mantiene activa la búsqueda. Incluso en lo cotidiano: “Yo todos los días busco. Leo historias, nombres. Así encontré gente que la conoció, que militó con ella. Es lindo escuchar esas cosas, porque es una forma de volver a encontrarla”.
            </p>
            <p>
              Cuando recuerda a su hermana, aparecen escenas simples: su llegada a la casa, su ropa, sus gestos. “Era libre, solidaria, muy inteligente. No le importaba lo material. Era una buena persona”. A casi cinco décadas, la ausencia sigue siendo una presencia constante. La mesa familiar guarda una imagen imborrable: la primera Navidad después de la desaparición. “Le pusimos el plato. La esperamos. No vino”.
            </p>
            <p>
              Sin embargo, hay algo que no se perdió: la esperanza. “Yo sigo creyendo que ese bebé está en algún lugar. Y lo seguimos esperando”.
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
              La historia de Walter Fernández, fundador de Granja Los Pibes, se entrelaza con la de toda una generación marcada por la militancia política, la represión y la violencia de la última dictadura. Su testimonio recorre desde la juventud en Tandil hasta su secuestro, las torturas y la reconstrucción de una vida atravesada por la memoria.
            </p>
            <p>
              Fernández creció en la zona de 14 de Julio y Constitución, un barrio donde compartía la infancia con amigos que, años más tarde, también quedarían alcanzados por la represión. “Yo digo hoy, era una zona liberada”, afirmó. Allí, entre juegos en la plaza Moreno y la escuela, comenzaron a gestarse las primeras inquietudes políticas.
            </p>
            <p>
              “Poníamos un disco de Arcoíris, de Sui Generis, y hablábamos de política”, recordó sobre aquellas reuniones juveniles, atravesadas por el contexto latinoamericano, la música y los debates de la época. Ese proceso derivó en la militancia en la Unión de Estudiantes Secundarios (UES), vinculada a Montoneros. 
            </p>
            <p>
              En 1975, en un clima de creciente violencia, la organización decidió el pase a la clandestinidad. Fernández se casó con Mabel, su compañera, y se trasladó a La Plata junto a otros militantes. “Ya no era que ibas a estudiar: éramos combatientes. No éramos boy scouts, queríamos el poder porque queríamos una Argentina que fuera viable”, explicó.
            </p>
            <p>
              El golpe del 24 de marzo de 1976 los sorprendió allí. Poco después, quedaron desconectados de la organización y debieron sobrevivir en condiciones extremas. El desgaste acumulado llevó a una decisión clave. “En enero del ‘77 yo ya estaba podrido. Fue mala mía. Le dije a mi mujer que nos volvíamos a Tandil”, contó. Sin saber qué había ocurrido con muchos de sus compañeros, regresó y consiguió trabajo en una fábrica. Lo detuvieron en la zona de Villa Italia y lo llevaron a la Comisaría Primera.
            </p>
            <p>
            Los interrogatorios y traslados clandestinos comenzaron de inmediato. “Nos sacaron de las celdas encapuchados y nos llevaron al fondo. Dos días después hicieron lo mismo, pero nos pusieron una capucha tabicada, nos cargaron a un baúl y nos llevaron a otro lugar. Sesión de tortura”, describió.
            </p>
            <p>Para entonces, ya tenía noticias del destino de algunos de sus amigos. “A esa altura yo ya sabía que al Diente y a Gustavo los habían matado en Bahía Blanca, y que Marocchi había desaparecido en Mar del Plata”.</p>
            <p>Un episodio clave para su supervivencia ocurrió a partir de una presentación judicial. “El juez Pagliere vino a la comisaría y dejó asentado que estábamos nosotros y que estábamos a disposición militar. Eso fue lo que nos salvó la vida”, afirmó. Sin embargo, aclaró que nunca estuvo formalmente detenido: “Siempre estuve secuestrado, nunca me blanquearon”.</p>
            <p>Tras pasar por el centro clandestino conocido como “La Huerta”, donde permaneció cerca de tres meses -y recibía visitas, según su testimonio, del sacerdote Baretto-, fue trasladado a una unidad penitenciaria. “Recién 40 días después le avisaron a mi señora dónde estaba yo. Ahí los militares habían dicho ‘a este no lo boleteamos’”, explicó.</p>
            <p>Fernández recuperó la libertad en 1978. El regreso no fue sencillo: el miedo persistía y la vida cotidiana estaba atravesada por la desconfianza. “No me animaba a andar solo”, dijo. Trabajaba en la peletería Kafka, al fondo de Aeronáutica Argentina y su madre y su esposa lo iban a buscar en colectivo.</p>
            <p>El regreso al barrio tampoco fue como lo había imaginado. “No esperaba una alfombra roja, pero los vecinos no me saludaban y tampoco a mi vieja o a mi abuela”, relató. Esa experiencia lo llevó a una reflexión más amplia: “Creo que fue lo que pasó con el país, una parte de la sociedad estuvo de acuerdo con lo que pasó”.</p>
            <p>Su primera declaración judicial fue en 1984. Además, declaró en el juicio por el asesinato del abogado Carlos Moreno y en la causa La Huerta.</p>
            <p>La ausencia de sus amigos marcó profundamente ese regreso. “Nos despedimos con un abrazo porque nos íbamos a cambiar el mundo y a algunos los trajeron en una cajita, otros no volvieron”, cerró con visible emoción.</p>
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
              se realizó en la ciudad el juicio por el secuestro y asesinato del abogado laboralista Carlos Moreno. Fueron condenados los cinco acusados, entre ellos dos civiles: los hermanos Emilio y Julio Méndez. Ambos fueron absueltos en un fallo posterior. Emilio murió en 2023, sin conocer la definición procesal final de la Justicia.
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
              culminó el juicio La Huerta, donde se juzgaron gran parte de los crímenes de lesa humanidad cometidos en Tandil y la región. De los 35 acusados, la Justicia condenó a ocho y absolvió a los otros 27. Las querellas apelaron esta decisión.
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2026</div>
            <div className="timeline-title">La búsqueda continúa</div>
            <div className="timeline-text">
              A 50 años del golpe de Estado, las familias y organismos de derechos humanos continúan buscando saber qué pasó con los desaparecidos de Tandil, y en particular por el destino de dos bebés que debieron haber nacido en cautiverio. Uno, el hijo de María Hebe Traficante y Carlos Martínez, que tendría que haber nacido entre noviembre y diciembre de 1977. Otro, el hijo de Haydée Susana Valor y Omar Marocchi, que tendría que haber nacido entre marzo y abril de 1977.
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
           En las aulas, en los clubes y en las plazas, Tandil sigue haciendo memoria.
          </div>
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
