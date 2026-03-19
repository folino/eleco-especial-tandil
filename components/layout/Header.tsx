'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [showHeader, setShowHeader] = useState(false)

  useGSAP(() => {
    // Progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      })
    }

    // Show header after hero
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: '600px top',
      onEnter: () => setShowHeader(true),
      onLeaveBack: () => setShowHeader(false),
    })
  })

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showHeader
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0'
      }`}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-sierra/10">
        <div
          ref={progressRef}
          className="progress-bar h-full bg-sierra origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Header content */}
      <div className="bg-cream/90 backdrop-blur-md border-b border-sierra/10">
        <div className="max-w-content mx-auto px-5 py-3 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Volver al inicio"
            className="flex items-center gap-3"
          >
            <Image
              src="/logo.png"
              alt="El Eco de Tandil"
              width={120}
              height={36}
              className="h-8 w-auto object-contain"
              priority
            />
            <span className="hidden sm:inline text-xs text-text-secondary font-body tracking-widest uppercase">
              Especial
            </span>
          </button>

          {/* Right actions */}
          <div className="flex items-center gap-4">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/elecodetandil"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="El Eco de Tandil en Facebook"
            className="text-sierra hover:text-sierra-dark transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
          </a>

          {/* Share */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Tandil: La ciudad que creció antes de decidir quién quería ser',
                  url: window.location.href,
                })
              } else {
                navigator.clipboard.writeText(window.location.href)
              }
            }}
            className="flex items-center gap-2 text-sm text-sierra hover:text-sierra-dark 
                       transition-colors font-body tracking-wide"
            aria-label="Compartir nota"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="hidden sm:inline">Compartir</span>
          </button>
          </div>
        </div>
      </div>
    </header>
  )
}
