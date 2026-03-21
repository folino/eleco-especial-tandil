import FadeIn from '@/components/ui/FadeIn'

export default function PinpointBlock() {
  return (
    <section className="bg-section-light noise-overlay py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <FadeIn>
          <div className="border border-sierra/20 rounded-sm p-6 md:p-8 bg-cream/60">
            <p className="text-xs uppercase tracking-[0.25em] text-sierra mb-4 font-body">
              Metodología
            </p>
            <p className="text-sm md:text-base text-text-secondary font-body leading-relaxed mb-6">
              Para la elaboración de este artículo se analizaron los documentos originales
              utilizando la herramienta Google Pinpoint. La colección completa de archivos
              de dominio público está disponible para su consulta en el siguiente enlace:
            </p>
            <a
              href="https://journaliststudio.google.com/pinpoint/search?collection=3844ba1351a72560&utm_source=collection_share_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-body text-sierra hover:text-sierra-dark transition-colors underline underline-offset-4 decoration-sierra/40 hover:decoration-sierra-dark"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Ver colección en Google Pinpoint
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
