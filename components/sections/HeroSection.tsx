'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const dataRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      gsap.set([titleRef.current, subtitleRef.current, dataRef.current, scrollRef.current], {
        opacity: 1, y: 0,
      })
      return
    }

    // Parallax background
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    // Entrance timeline
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(dataRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.2'
    )

    // Fade out on scroll
    gsap.to([titleRef.current, subtitleRef.current, dataRef.current], {
      opacity: 0,
      y: -40,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: '20% top',
        end: '50% top',
        scrub: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background — placeholder gradient (replace with photo) */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[10%] -bottom-[10%]"
        style={{
          background: `
            linear-gradient(180deg, 
              rgba(26,26,46,0.3) 0%, 
              rgba(26,26,46,0.1) 40%, 
              rgba(139,115,85,0.15) 70%,
              rgba(250,250,248,1) 100%
            ),
            linear-gradient(135deg, 
              #4a6741 0%, 
              #7a8b6e 25%, 
              #a8c4a0 45%, 
              #8B9F82 65%, 
              #6d7a61 100%
            )
          `,
        }}
      >
        {/* TODO: Replace with real photo */}
        {/* <Image src="/images/tandil-hero.webp" alt="" fill className="object-cover" priority /> */}

        {/* Simulated mountain silhouette */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height: '35%' }}
        >
          <path
            fill="rgba(139,115,85,0.12)"
            d="M0,224 C120,160 240,200 360,180 C480,160 540,120 720,140 C900,160 1020,100 1200,130 C1320,150 1400,180 1440,200 L1440,320 L0,320Z"
          />
          <path
            fill="rgba(250,250,248,0.6)"
            d="M0,260 C180,220 300,250 480,230 C660,210 800,190 960,210 C1120,230 1280,250 1440,240 L1440,320 L0,320Z"
          />
        </svg>
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center">
        {/* Kicker */}
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-sierra-dark/70 mb-6 font-body">
          Especial · El Eco de Tandil
        </p>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-display text-hero text-text-primary opacity-0 mb-6"
        >
          Tandil, la ciudad que creció antes de decidir quién quería ser
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-text-secondary font-body font-light leading-relaxed max-w-2xl mx-auto opacity-0 mb-12"
        >
          Cómo una ciudad intermedia del sur bonaerense se convirtió en uno de los fenómenos 
          urbanos más llamativos de la Argentina contemporánea
        </p>

        {/* Key data point */}
        <div ref={dataRef} className="opacity-0">
          <div className="inline-flex flex-col items-center gap-1 px-6 py-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-sierra/10">
            <span className="font-mono text-3xl md:text-4xl font-medium text-sierra tracking-tight">
              +77,2%
            </span>
            <span className="text-xs text-text-secondary tracking-wide uppercase">
              expansión urbana en 40 años
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-text-secondary/60 tracking-widest uppercase font-body">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-sierra/40 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
