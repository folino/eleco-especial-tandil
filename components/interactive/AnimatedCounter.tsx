'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedCounterProps {
  end: number
  suffix?: string
  prefix?: string
  decimals?: number
  label: string
  duration?: number
  colorClass?: string
}

export default function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  decimals = 0,
  label,
  duration = 2,
  colorClass = 'text-accent-data',
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (!counterRef.current || !numberRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      numberRef.current.textContent = `${prefix}${end.toLocaleString('es-AR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`
      gsap.set(counterRef.current, { opacity: 1 })
      return
    }

    const obj = { val: 0 }

    gsap.fromTo(counterRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counterRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          onEnter: () => {
            gsap.to(obj, {
              val: end,
              duration,
              ease: 'power2.out',
              onUpdate: () => {
                if (numberRef.current) {
                  numberRef.current.textContent = `${prefix}${obj.val.toLocaleString('es-AR', {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                  })}${suffix}`
                }
              },
            })
          },
        },
      }
    )
  }, { scope: counterRef })

  return (
    <div ref={counterRef} className="opacity-0 text-center min-w-0">
      <span
        ref={numberRef}
        className={`data-highlight block truncate ${colorClass}`}
      >
        {prefix}0{suffix}
      </span>
      <span className="block mt-2 text-sm md:text-base text-text-secondary font-body tracking-wide uppercase">
        {label}
      </span>
    </div>
  )
}
