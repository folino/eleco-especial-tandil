import FadeIn from '@/components/ui/FadeIn'

export default function Footer() {
  return (
    <footer className="bg-dark text-white/70 py-16 md:py-24">
      <div className="max-w-prose-wide mx-auto px-5 md:px-8 text-center">
        <FadeIn>
          <div className="hr-editorial !bg-white/20 mb-10" />

          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4 font-body">
            Una producción especial de
          </p>

          <h3 className="font-display text-2xl md:text-3xl text-white mb-6">
            El Eco de Tandil
          </h3>

          <div className="space-y-1 text-sm text-white/50 mb-10">
            <p>Producción periodística: [nombre periodista]</p>
            <p>Fotografía: [nombre fotógrafo]</p>
            <p>Desarrollo: Equipo de Tecnología — Grupo Rotonda</p>
          </div>

          <div className="flex items-center justify-center gap-6 text-white/40">
            <a
              href="https://www.eleco.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70 transition-colors text-sm"
            >
              eleco.com.ar
            </a>
            <span className="text-white/20">·</span>
            <a
              href="#"
              className="hover:text-white/70 transition-colors text-sm"
            >
              Instagram
            </a>
            <span className="text-white/20">·</span>
            <a
              href="#"
              className="hover:text-white/70 transition-colors text-sm"
            >
              YouTube
            </a>
          </div>

          <p className="mt-12 text-xs text-white/25">
            © {new Date().getFullYear()} El Eco de Tandil — Grupo Rotonda
          </p>
        </FadeIn>
      </div>
    </footer>
  )
}
