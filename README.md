# Tandil: La ciudad que creció antes de decidir quién quería ser

Micrositio especial de **El Eco de Tandil** — Scrollytelling editorial interactivo.

## Stack

- **Next.js 14** (App Router, static export)
- **Tailwind CSS** + Typography plugin
- **GSAP + ScrollTrigger** (animaciones scroll-driven)
- **Lenis** (smooth scroll)
- **Leaflet + OpenStreetMap** (mapa interactivo)

## Setup

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build
```

Genera un export estático en `/out`. Deploy directo a **Vercel**:

```bash
npx vercel
```

O en Vercel Dashboard: importar repo → detecta Next.js automáticamente.

## Estructura

```
app/
  layout.tsx            → Metadata, fonts, Lenis
  page.tsx              → Ensamble de secciones
  globals.css           → Tailwind + editorial styles

components/
  layout/
    Header.tsx          → Logo + progress bar + compartir
    Footer.tsx          → Créditos
  sections/
    HeroSection.tsx     → 1. Apertura inmersiva
    IntermediaSection.tsx → 2. Ciudad intermedia + infografía
    TimelineSection.tsx → 3. Timeline 2001–2022
    NumbersSection.tsx  → 4. Counters animados
    TwoFacesSection.tsx → 5. Las dos caras + mapa
    PivotSection.tsx    → 6. Momento bisagra
    StoriesSection.tsx  → 7. Testimonios
    ComparisonSection.tsx → 8. Tandil vs Aubenas
  interactive/
    AnimatedCounter.tsx → Counter scroll-triggered
    PullQuote.tsx       → Quote editorial
    TandilMap.tsx       → Mapa Leaflet con capas
  ui/
    FadeIn.tsx          → Wrapper animación fade-in
    LenisProvider.tsx   → Smooth scroll context
```

## Assets pendientes

Las imágenes están como placeholders. Para reemplazar:

1. Agregar fotos optimizadas (WebP) en `public/images/`
2. En `HeroSection.tsx`: descomentar el `<Image>` y apuntar a la foto hero
3. En `StoriesSection.tsx`: reemplazar los placeholders de perfil
4. Ajustar coordenadas en `TandilMap.tsx` con datos reales de barrios

## Dominio

Configurar `especial.eleco.com.ar` como custom domain en Vercel Dashboard.

---

**El Eco de Tandil — Grupo Rotonda** | Equipo de Tecnología
