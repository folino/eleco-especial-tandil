'use client'

import FadeIn from '@/components/ui/FadeIn'

interface PullQuoteProps {
  children: React.ReactNode
  author?: string
  className?: string
}

export default function PullQuote({ children, author, className = '' }: PullQuoteProps) {
  return (
    <FadeIn className={`my-12 md:my-20 ${className}`}>
      <blockquote className="pull-quote prose-editorial">
        <p className="!text-pull-quote !mb-0 !leading-relaxed">{children}</p>
        {author && (
          <cite className="block mt-4 text-sm font-body not-italic text-text-secondary tracking-wide">
            — {author}
          </cite>
        )}
      </blockquote>
    </FadeIn>
  )
}
