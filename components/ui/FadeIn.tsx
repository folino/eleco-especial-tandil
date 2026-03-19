'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  duration?: number
  as?: keyof JSX.IntrinsicElements
}

export default function FadeIn({ 
  children, 
  className = '', 
  delay = 0, 
  y = 40, 
  duration = 0.9,
  as: Tag = 'div' 
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(ref.current, { opacity: 1, y: 0 })
      return
    }

    gsap.fromTo(ref.current,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: ref })

  return (
    // @ts-ignore
    <Tag ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </Tag>
  )
}
