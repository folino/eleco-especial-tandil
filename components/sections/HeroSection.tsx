'use client'

import { useRef } from 'react'
import Image from 'next/image'
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
      immediateRender: false,
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
      >
        <Image
          src="/tandil-prueba.jpg"
          alt="Tandil"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg,
            rgba(10,10,20,0.85) 0%,
            rgba(10,10,20,0.75) 50%,
            rgba(10,10,20,0.9) 100%
          )`,
        }}
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center">
        {/* Kicker */}
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/70 mb-6 font-body">
          Especial · El Eco de Tandil
        </p>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-display text-hero text-white opacity-0 mb-6"
        >
          Tandil, la ciudad que creció antes de decidir quién quería ser
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-white/80 font-body font-light leading-relaxed max-w-2xl mx-auto opacity-0 mb-12"
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
