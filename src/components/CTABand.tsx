'use client'

interface CTABandProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export default function CTABand({ 
  title = "¿Tienes una celebración especial?", 
  subtitle = "Cuéntanos qué necesitas y te preparamos una selección a medida con los mejores productos ibéricos.",
  buttonText = "Escribir por WhatsApp"
}: CTABandProps) {
  return (
    <section className="py-24 px-6 bg-bg-cta border-t border-gold/10">
      <div className="container mx-auto">
        <div className="bg-bg-card rounded-[2rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 border border-gold/10 shadow-2xl relative overflow-hidden group">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative z-10 text-center md:text-left max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-medium text-gold mb-4">
              {title}
            </h2>
            <p className="text-gold/45 text-sm md:text-lg font-light leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <a 
              href="https://wa.me/34691419369"
              target="_blank"
              className="inline-flex items-center gap-3 bg-[#25d366] hover:bg-[#20ba5a] text-[#0c0805] px-8 py-4 rounded-2xl font-bold text-base transition-all shadow-lg shadow-green-500/20 hover:scale-105 active:scale-95 group/btn"
            >
              <WhatsAppIcon className="w-6 h-6 fill-[#0c0805] group-hover:scale-110 transition-transform" />
              <span>{buttonText}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .01 5.403.007 12.039c0 2.121.54 4.19 1.566 6.041L0 24l6.103-1.601a11.832 11.832 0 005.94 1.585h.005c6.637 0 12.042-5.403 12.045-12.039a11.82 11.82 0 00-3.483-8.482z" />
    </svg>
  )
}
