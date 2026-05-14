import AdminEditable from './AdminEditable'

interface PageHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  eyebrowId?: string
  titleId?: string
  subtitleId?: string
}

export default function PageHero({ 
  eyebrow, 
  title, 
  subtitle,
  eyebrowId,
  titleId,
  subtitleId
}: PageHeroProps) {
  return (
    <section className="relative pt-36 pb-20 px-6 bg-bg-base overflow-hidden border-b border-white/5">
      {/* Premium ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gold/10 blur-[160px] rounded-full opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,theme(colors.bg.base)_100%)] opacity-40" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        {eyebrow && (
          <div className="mb-6 opacity-0 animate-fade-in">
            {eyebrowId ? (
              <AdminEditable id={eyebrowId} content={eyebrow}>
                <span className="inline-block text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-gold/60 font-bold border-b border-gold/20 pb-2">
                  {eyebrow}
                </span>
              </AdminEditable>
            ) : (
              <span className="inline-block text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-gold/60 font-bold border-b border-gold/20 pb-2">
                {eyebrow}
              </span>
            )}
          </div>
        )}
        
        {titleId ? (
          <AdminEditable id={titleId} content={title}>
            <h1 className="text-4xl md:text-6xl font-serif text-[#f4ead5] mb-6 leading-tight opacity-0 animate-fade-in-up">
              {title}
            </h1>
          </AdminEditable>
        ) : (
          <h1 className="text-4xl md:text-6xl font-serif text-[#f4ead5] mb-6 leading-tight opacity-0 animate-fade-in-up">
            {title}
          </h1>
        )}
        
        {subtitle && (
          <div className="opacity-0 animate-fade-in [animation-delay:0.3s] [animation-fill-mode:forwards]">
            {subtitleId ? (
              <AdminEditable id={subtitleId} content={subtitle}>
                <p className="text-[#a39485] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                  {subtitle}
                </p>
              </AdminEditable>
            ) : (
              <p className="text-[#a39485] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
